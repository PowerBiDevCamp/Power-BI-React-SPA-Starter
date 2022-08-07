export interface PowerBiWorkspace {
  id: string;
  name: string;
  isReadOnly?: boolean;
  isOnDedicatedCapacity?: boolean;
  capacityId?: string;
}

export interface PowerBiReport {
  id: string;
  embedUrl: string;
  name: string;
  webUrl: string;
  datasetId: string;
  reportType: string;
  isOwnedByMe: boolean;
}

export interface PowerBiDataset {
  name: string;
  createReportEmbedURL: string;
  id: string;
  configuredBy: string;
  isRefreshable: boolean;
  isEffectiveIdentityRequired: boolean;
  isEffectiveIdentityRolesRequired: boolean;
  isOnPremGatewayRequired: boolean;
  targetStorageMode: string;
  createdDate: Date
}