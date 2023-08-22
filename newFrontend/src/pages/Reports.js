import { useState } from "react";
import Form from "react-bootstrap/Form";
import Spinner from "../components/Spinner";
import { CDBBtn } from "cdbreact";
import axios from "axios";

export const Reports = () => {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("jwtToken");
  const apiKey =
    "test_eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI2OTcwOTAyMTE4MDMwOTc5MzMiLCJhdWQiOiJjYXJib25lIiwiZXhwIjoyMzU0ODE0ODI5LCJkYXRhIjp7InR5cGUiOiJ0ZXN0In19.Ab6h0cCTSz0wZyrRlhjdZu-4iW0KvacHjb1uhTxzgjMkSVGHUdCsH8c0DMboSMZfUwrc4aCuxKdrMsKV6aeRopVZAPqVwq6lSimgHskiDkFHp1rai6EQhDF-myylkWzYi5t3SsxMTvDVzGoee2Ffhq63M5H8sTG8hF75wX5M3ENWYIoB";

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const reportDataResponse = await axios.get(
        `https://localhost:44343/api/report/generate-report?start=${startDate}&end=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const formattedData = {
        data: reportDataResponse.data,
        convertTo: "pdf",
      };
      console.log(formattedData);
      const carboneResponse = await axios.post(
        "https://api.carbone.io/render/ad836fa3e804debec359b942c3fc6b628d2e6c832efadb907e1a712199c55f96",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      const renderId = carboneResponse.data.data.renderId;

      const pdfResponse = await axios.get(
        `https://api.carbone.io/render/${renderId}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([pdfResponse.data], { type: "application/pdf" });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("open", `${renderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper flex-column text-center">
      <h1>Generate Report</h1>
      <div
        className="row flex-column position-relative mt-3"
        id="pageContainer"
      >
        <Form onSubmit={handleReportSubmit}>
          <div className="col-2 m-auto">
            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>Report Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>Report End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </Form.Group>
          </div>
          <div className="row col-2 m-auto">
            <CDBBtn
              type="submit"
              variant="success"
              role="button"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Submit"}
            </CDBBtn>
          </div>
        </Form>
      </div>
    </div>
  );
};
