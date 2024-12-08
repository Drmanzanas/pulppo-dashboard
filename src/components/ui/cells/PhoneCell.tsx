const PhoneCell = ({ value }: { value: string }) => (
    <span className="text-gray-600">{value || 'N/A'}</span>
  );
  
  export default PhoneCell;