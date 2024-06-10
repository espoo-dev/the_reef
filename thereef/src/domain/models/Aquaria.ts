export type Aquaria = {
  id: number;
  name: string;
  dimension: Dimension;
  embedded_server: EmbeddedServer;
}

type Dimension = {
  height_cm: number;
  width_cm: number;
  length_cm: number;
}

type EmbeddedServer = {
  id: number;
  name: string;
  mac_address: string;
}
