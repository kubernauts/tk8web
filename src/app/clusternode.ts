export class Clusternode {
  public isMaster: boolean;
  public isWorker: boolean;
  public isEtcd: boolean;
  public IpAddress: string;
  public Architecture: string;
  public ContainerRuntime: string;
  public KubeVersion: string;
  public OS: string;
  constructor(
    public Name: string,
    public Kind: string
  )
  {

  }
}
