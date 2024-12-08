const ProfilePictureCell = ({ value }: { value: string }) => (
    value ? (
      <img
        src={value}
        alt="Profile"
        className="h-10 w-10 rounded-full object-cover border border-gray-300"
      />
    ) : (
      <span className="text-gray-500">No Picture</span>
    )
  );
  
  export default ProfilePictureCell;