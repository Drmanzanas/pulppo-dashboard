type TableProps = {
    data: {
      _id: string;
      referenceCode: string;
      type: string;
      listing: { title: string; price: { price: number; currency: string } };
      agent: { firstName: string; lastName: string };
      pictures: { url: string }[];
      videos: { url: string }[];
    }[];
  };
  
  export default function Table({ data }: TableProps) {
    return (
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Reference Code</th>
            <th className="border border-gray-300 px-4 py-2">Property Type</th>
            <th className="border border-gray-300 px-4 py-2">Listing Title</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Agent</th>
            <th className="border border-gray-300 px-4 py-2">Picture</th>
            <th className="border border-gray-300 px-4 py-2">Video</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td className="border border-gray-300 px-4 py-2">{item.referenceCode || 'N/A'}</td>
              <td className="border border-gray-300 px-4 py-2">{item.type || 'N/A'}</td>
              <td className="border border-gray-300 px-4 py-2">{item.listing?.title || 'N/A'}</td>
              <td className="border border-gray-300 px-4 py-2">
                {item.listing?.price?.currency} {item.listing?.price?.price || 'N/A'}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.agent?.firstName || 'N/A'} {item.agent?.lastName || ''}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.pictures?.length ? (
                  <img src={item.pictures[0].url} alt="property" className="w-20 h-20 object-cover" />
                ) : (
                  'No Picture'
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.videos?.length ? (
                  <a
                    href={`https:${item.videos[0].url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Video
                  </a>
                ) : (
                  'No Video'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }