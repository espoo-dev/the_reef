import { EquipmentContainer, StatusText } from './Equipment.styles';

export interface EquipmentProps {
  name: string;
  status?: boolean;
}

const Equipment = ({ name, status = false }: EquipmentProps) => {
  return (
    <EquipmentContainer>
      <span>{name}</span>
      <StatusText status={status}>{status ? 'ON' : 'OFF'}</StatusText>
    </EquipmentContainer>
  );
};

export default Equipment;
