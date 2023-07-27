export const getSuccessActionMessage = (
  itemName: string,
  action: 'deleted' | 'added' | 'updated',
) => {
  return `${itemName} has been ${action} successfully`;
};
