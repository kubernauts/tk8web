export class Cluster {
  public cidr: string;
  public subnetPrivate: string;
  public subnetPublic: string;
  public keyPairName: string;
  public generateKeyPair: boolean;
  constructor(
    public name: string,
    public os: string,
    public provisioner: string,
    public installer: string,
    public region: string,
    public master: Instance,
    public etcd: Instance,
    public node: Instance,
    public access: Access,
  ) {}
}

export class Instance {
  constructor(
  public count: number,
  public size: string,
  ) {}
}

export class Access {
  constructor(
    public key: string,
    public secret: string,
  ) {}
}

export class ClusterForm {
  constructor(
    public network: boolean,
  ) {}
}
