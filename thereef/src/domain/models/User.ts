export type User = {
  email: string;
  token: string,
  refresh_token: string,
  expires_in: number,
  token_type: string,
  resource_owner: ResourceOwner
}

export type ResourceOwner = {
  id: number,
  email: string,
  created_at: string,
  updated_at: string
}
