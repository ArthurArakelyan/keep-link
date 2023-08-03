export interface IGetLinkOgImageResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    ogImage: string;
  };
}
