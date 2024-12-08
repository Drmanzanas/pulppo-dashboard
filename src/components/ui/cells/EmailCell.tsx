const EmailCell = ({ value }: { value: string }) => (
    <span className="text-gray-600 break-words">{value || 'N/A'}</span>
  );
  
  export default EmailCell;