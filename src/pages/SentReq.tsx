import { useState } from "react";
import { useSentRequests } from "../services/queries";
import Request from "./Request";

export default function SentRequest() {
  const [currentPage, setCurrentPage] = useState(1);
  const sentRequest = useSentRequests(currentPage);
  return (
    <Request
      response={sentRequest}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      type="Sent"
    />
  );
}
