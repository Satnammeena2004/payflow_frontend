import { useState } from "react";
import { useReceivedRequests } from "../services/queries";
import Request from "./Request";

export default function ReceivedRequest() {
  const [currentPage, setCurrentPage] = useState(1);
  const receivedRequest = useReceivedRequests(currentPage);
  return (
    <Request
      response={receivedRequest}
      type="Received"
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
}
