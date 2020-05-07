# Github actions workflow

## global action name

```yaml
# global action name
name: CICD
```

## trigger event

```yaml
# triggered on event
# more complex example:
# on:
#   push:
#     branches:
#       - master
#     tags:
#       - v1
#     # file paths to consider in the event. Optional; defaults to all.
#     paths:
#       - 'test/*'
on: [push]
```

## defining global enviroment variables

```yaml
# gobal enviroment variables
env:
  KUBE_CONFIG: "${{ secrets.KUBECONFIG }}"
```

## jobs

```yaml
# executed in parallel by default
jobs:
```

### job id

```yaml
  # job id - unique to the jobs object. The <job_id> must start with a letter or _ and contain only alphanumeric characters, -, or _.
  pipeline:
```

#### job name

```yaml
    # job name
    name: build and kubernetes deployment
```

#### Execution enviroment

this defines the jobs node operating system

```yaml
    # runner are predefined by github. Enviroments are win, osx, linux
    # you can also use self-hosted runner
    # all self-hosted runners get the self-hosted label and each self-hosted runner has labels for its operating system and system architecture.
    # must be added to each repo settings->actions->add runner
    # example: runs-on: [self-hosted, linux, ARM32]
    runs-on: ubuntu-18.04
```

#### excution steps

```yaml
    # executed sequently
    steps:
```

#### sets calculated enviroment variables

```yaml
      # step name
    - name: set calculated enviroment variables
    # run: executs commands
    # $GITHUB_REPOSITORY = owner_name/repository_name
    # commands setting env = repository_name
      run: |
        echo ::set-env name=KUBE_NAMESPACE::$(echo "$GITHUB_REPOSITORY" | awk -F / '{print $2}')
        echo ::set-env name=KUBE_DEPLOYMENT::$(echo "$GITHUB_REPOSITORY" | awk -F / '{print $2}')
        echo ::set-env name=KUBE_LABEL::$(echo "$GITHUB_REPOSITORY" | awk -F / '{print $2}')
        echo ::set-env name=KUBE_CONTAINERNAME::$(echo "$GITHUB_REPOSITORY" | awk -F / '{print $2}')
```

#### checkout catalog action
 
```yaml
      # This action checks-out your repository under $GITHUB_WORKSPACE, so your workflow can access it.
      # default branch = master
    - name: Check out repository code
      uses: actions/checkout@v2
```

#### node setup catalog action

set a specific node version

```yaml
    - name: setup Node.js 10 env
      uses: actions/setup-node@v1
      with:
        node-version: '10.x'

    - name: Install on Node.js 10
      run: npm install

    - name: Build on Node.js 10
      run: npm run build -- --output-path=./dist/out
      env:
        CI: true
```

#### build docker image from source

```yaml
      # ${{ github.repository }} = owner_name/repository_name
    - name: Build docker image
      run: docker build . --file Dockerfile --tag ${{ secrets.DOCKER_REGISTRY }}/${{ github.repository }}:latest
```

#### log into private docker registry

```YAML
      # for amazon ecr
      # - name: Login to ECR
      #   id: ecr
      #   uses: elgohr/ecr-login-action@master
      #   with:
      #     access_key: ${{ secrets.AWS_ACCESS_KEY }}
      #     secret_access_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      #     region: ${{ secrets.AWS_REGION }}
    - name: Log into private registry
      run: echo "${{ secrets.DOCKER_PASSWD }}" | docker login ${{ secrets.DOCKER_REGISTRY }} -u ${{ secrets.DOCKER_UNAME }} --password-stdin
```

#### tag and push image to private registry

```yaml
      # for amazon ecr
      # - name: Publish to Registry
      #   uses: elgohr/Publish-Docker-Github-Action@master
      #   with:
      #     name: ${{ github.repository }}
      #     username: ${{ steps.ecr.outputs.username }}
      #     password: ${{ steps.ecr.outputs.password }}
      #     registry: ${{ steps.ecr.outputs.registry }}
    - name: Push image to private registry and tag
      run: |
        IMAGE_NAME=${{ secrets.DOCKER_REGISTRY }}/${{ github.repository }}
        VERSION=$(echo $GITHUB_SHA | cut -c 1-6)
        echo VERSION=$VERSION
        echo ::set-env name=DOCKER_IMAGE_TAG::$(echo $IMAGE_NAME:$VERSION) 

        docker tag $IMAGE_NAME:latest $IMAGE_NAME:$VERSION
        docker push $IMAGE_NAME:$VERSION
        docker push $IMAGE_NAME:latest
```

#### setup kubeconfig on jobs node

```yaml
      # decode and pass kubeconfig to | another option, set via azure/k8s-set-context@v1
      # - name: Configure kubeconfig job node
      #   uses: azure/k8s-set-context@v1
      #   with:
      #     method: kubeconfig
      #     kubeconfig: $KUBE_CONFIG
      #     context: $KUBE_NAMESPACE  #If left unspecified, current-context from kubeconfig is used as default
    - name: Configure kubeconfig job node
      run: |
        mkdir -p ~/.kube
        echo $KUBE_CONFIG | base64 -d > ~/.kube/config
```

#### rollout the new image to kubernetes

```yaml
    - name: Rollout latest image to kubernetes
      run: |
        echo "kubectl validation"
        kubectl cluster-info

        echo "setting authentication for gitlab registry"
        kubectl -n $KUBE_NAMESPACE delete --ignore-not-found=true secret registry-auth
        kubectl -n $KUBE_NAMESPACE create secret docker-registry registry-auth --docker-server=${{ secrets.DOCKER_REGISTRY }} --docker-username=${{ secrets.DOCKER_UNAME }} --docker-password=${{ secrets.DOCKER_PASSWD }}

        echo "Deploying latest image"
        kubectl -n $KUBE_NAMESPACE get pods -l app=$KUBE_LABEL

        echo "set deployment to latest Image $DOCKER_IMAGE_TAG"
        kubectl -n $KUBE_NAMESPACE set image deployment $KUBE_DEPLOYMENT $KUBE_CONTAINERNAME=$DOCKER_IMAGE_TAG
        kubectl -n $KUBE_NAMESPACE rollout status deployment $KUBE_DEPLOYMENT
```

#### cleanup the config

for security reasons remove the config

```yaml
      # always try to cleanup
    - name: Cleanup kubeconfig
      if: ${{ always() }}
      run: |
        rm -f ~/.kube/config
```

#### paste the result to slack

this catalog action is used to notify slack

```yaml
      # if job is successful paste to slack
    - name: slack hook
      uses: rtCamp/action-slack-notify@master
      env:
        SLACK_CHANNEL: alerts
        SLACK_COLOR: '#3278BD'
        SLACK_ICON: https://github.githubassets.com/images/modules/logos_page/Octocat.png
        SLACK_TITLE: 'Github action successful :rocket:'
        SLACK_USERNAME: Octocat
        SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
```

## complete YAML

<details><summary>Expand here to see the solution</summary>
<p>

```YAML
# global action name
name: CICD
# triggered on event
# more complex example:
# on:
#   push:
#     branches:
#       - master
#     tags:
#       - v1
#     # file paths to consider in the event. Optional; defaults to all.
#     paths:
#       - 'test/*'
on: [push]
# gobal enviroment variables
env:
  KUBE_CONFIG: "${{ secrets.KUBECONFIG }}"

# executed in parallel by default
jobs:
  # job id - unique to the jobs object. The <job_id> must start with a letter or _ and contain only alphanumeric characters, -, or _.
  pipeline:
    # job name
    name: build and kubernetes deployment
    # runner are predefined by github. Enviroments are win, osx, linux
    # you can also use self-hosted runner
    # all self-hosted runners get the self-hosted label and each self-hosted runner has labels for its operating system and system architecture.
    # must be added to each repo settings->actions->add runner
    # example: runs-on: [self-hosted, linux, ARM32]
    runs-on: ubuntu-18.04
    # executed sequently
    steps:
      # step name
    - name: set calculated enviroment variables
      # executs command
      # $GITHUB_REPOSITORY = owner_name/repository_name
      # commands setting env = repository_name
      run: |
        echo ::set-env name=KUBE_NAMESPACE::$(echo "$GITHUB_REPOSITORY" | awk -F / '{print $2}')
        echo ::set-env name=KUBE_DEPLOYMENT::$(echo "$GITHUB_REPOSITORY" | awk -F / '{print $2}')
        echo ::set-env name=KUBE_LABEL::$(echo "$GITHUB_REPOSITORY" | awk -F / '{print $2}')
        echo ::set-env name=KUBE_CONTAINERNAME::$(echo "$GITHUB_REPOSITORY" | awk -F / '{print $2}')
      # This action checks-out your repository under $GITHUB_WORKSPACE, so your workflow can access it.
      # default branch = master
    - name: Check out repository code
      uses: actions/checkout@v2

    - name: setup Node.js 10 env
      uses: actions/setup-node@v1
      with:
        node-version: '10.x'

    - name: Install on Node.js 10
      run: npm install

    - name: Build on Node.js 10
      run: npm run build -- --output-path=./dist/out 
      env:
        CI: true

      # ${{ github.repository }} = owner_name/repository_name
    - name: Build docker image
      run: docker build . --file Dockerfile --tag ${{ secrets.DOCKER_REGISTRY }}/${{ github.repository }}:latest

      # for amazon ecr
      # - name: Login to ECR
      #   id: ecr
      #   uses: elgohr/ecr-login-action@master
      #   with:
      #     access_key: ${{ secrets.AWS_ACCESS_KEY }}
      #     secret_access_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      #     region: ${{ secrets.AWS_REGION }}
    - name: Log into private registry
      run: echo "${{ secrets.DOCKER_PASSWD }}" | docker login ${{ secrets.DOCKER_REGISTRY }} -u ${{ secrets.DOCKER_UNAME }} --password-stdin

      # for amazon ecr
      # - name: Publish to Registry
      #   uses: elgohr/Publish-Docker-Github-Action@master
      #   with:
      #     name: ${{ github.repository }}
      #     username: ${{ steps.ecr.outputs.username }}
      #     password: ${{ steps.ecr.outputs.password }}
      #     registry: ${{ steps.ecr.outputs.registry }}
    - name: Push image to private registry and tag
      run: |
        IMAGE_NAME=${{ secrets.DOCKER_REGISTRY }}/${{ github.repository }}
        VERSION=$(echo $GITHUB_SHA | cut -c 1-6)
        echo VERSION=$VERSION
        echo ::set-env name=DOCKER_IMAGE_TAG::$(echo $IMAGE_NAME:$VERSION) 

        docker tag $IMAGE_NAME:latest $IMAGE_NAME:$VERSION
        docker push $IMAGE_NAME:$VERSION
        docker push $IMAGE_NAME:latest

      # decode and pass kubeconfig to | another option, set via azure/k8s-set-context@v1
      # - name: Configure kubeconfig job node
      #   uses: azure/k8s-set-context@v1
      #   with:
      #     method: kubeconfig
      #     kubeconfig: $KUBE_CONFIG
      #     context: $KUBE_NAMESPACE  #If left unspecified, current-context from kubeconfig is used as default
    - name: Configure kubeconfig job node
      run: |
        mkdir -p ~/.kube
        echo $KUBE_CONFIG | base64 -d > ~/.kube/config


    - name: Rollout latest image to kubernetes
      run: |
        echo "kubectl validation"
        kubectl cluster-info

        echo "setting authentication for gitlab registry"
        kubectl -n $KUBE_NAMESPACE delete --ignore-not-found=true secret registry-auth
        kubectl -n $KUBE_NAMESPACE create secret docker-registry registry-auth --docker-server=${{ secrets.DOCKER_REGISTRY }} --docker-username=${{ secrets.DOCKER_UNAME }} --docker-password=${{ secrets.DOCKER_PASSWD }}

        echo "Deploying latest image"
        kubectl -n $KUBE_NAMESPACE get pods -l app=$KUBE_LABEL

        echo "set deployment to latest Image $DOCKER_IMAGE_TAG"
        kubectl -n $KUBE_NAMESPACE set image deployment $KUBE_DEPLOYMENT $KUBE_CONTAINERNAME=$DOCKER_IMAGE_TAG
        kubectl -n $KUBE_NAMESPACE rollout status deployment $KUBE_DEPLOYMENT

      # always try to cleanup
    - name: Cleanup kubeconfig
      if: ${{ always() }}
      run: |
        rm -f ~/.kube/config

      # if job is successful paste to slack
    - name: slack hook
      uses: rtCamp/action-slack-notify@master
      env:
        SLACK_CHANNEL: alerts
        SLACK_COLOR: '#3278BD'
        SLACK_ICON: https://github.githubassets.com/images/modules/logos_page/Octocat.png
        SLACK_TITLE: 'Github action successful :rocket:'
        SLACK_USERNAME: Octocat
        SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
```

</p>
