export abstract class PermissionUseCase {
  abstract createAdmin(data: string, admin?: boolean): Promise<any>;
}
