const NameCell = ({ value }: { value: string }) => (
    <span className="font-medium text-gray-800">{value || 'N/A'}</span>
  );
  
  export default NameCell;