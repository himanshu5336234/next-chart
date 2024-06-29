import React from "react";
import { Box } from "@mui/material";
import Both from "../../../public/images/orderBook/Both.svg";
import Asks from "../../../public/images/orderBook/Asks.svg";
import Bids from "../../../public/images/orderBook/Bids.svg";

const AskOrbids = ({
  asksOrBids,
  handleTabsChange,
}: {
  asksOrBids: string;
  handleTabsChange: any;
}) => {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        height: "20px",
        justifyContent: "space-between",
        m: 1,
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box
          onClick={() => handleTabsChange("ALL")}
          sx={{
            height: "10px",
            cursor: "pointer",
            filter: `${asksOrBids !== "ALL" ? "opacity(0.4)" : ""}`,
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0.0742485H7.68938V7.15347H0V0.0742485Z"
              fill="#FF6554"
            />
            <path d="M0 8.84653H7.68938V15.9258H0V8.84653Z" fill="#00CC8E" />
            <path d="M9.38243 0H19.8297V4.20463H9.38243V0Z" fill="#D9D9D9" />
            <path
              d="M9.38243 5.89769H19.8297V10.1023H9.38243V5.89769Z"
              fill="#D9D9D9"
            />
            <path
              d="M9.38243 11.7954H19.8297V16H9.38243V11.7954Z"
              fill="#D9D9D9"
            />
          </svg>
        </Box>
        <Box
          onClick={() => handleTabsChange("ASKS")}
          sx={{
            height: "10px",
            cursor: "pointer",
            filter: `${asksOrBids !== "ASKS" ? "opacity(0.4)" : ""}`,
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 21 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.82959 0H8.51897V15.9671H0.82959V0Z" fill="#FF6554" />
            <path d="M10.212 0H20.6593V4.20463H10.212V0Z" fill="#D9D9D9" />
            <path
              d="M10.212 5.89769H20.6593V10.1023H10.212V5.89769Z"
              fill="#D9D9D9"
            />
            <path
              d="M10.212 11.7954H20.6593V16H10.212V11.7954Z"
              fill="#D9D9D9"
            />
          </svg>
        </Box>

        <Box
          onClick={() => handleTabsChange("BIDS")}
          sx={{
            height: "10px",
            cursor: "pointer",
            filter: `${asksOrBids !== "BIDS" ? "opacity(0.4)" : ""}`,
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 21 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.659424 0H8.3488V15.9656H0.659424V0Z" fill="#00CC8E" />
            <path d="M10.0419 0H20.4891V4.20463H10.0419V0Z" fill="#D9D9D9" />
            <path
              d="M10.0419 5.89769H20.4891V10.1023H10.0419V5.89769Z"
              fill="#D9D9D9"
            />
            <path
              d="M10.0419 11.7954H20.4891V16H10.0419V11.7954Z"
              fill="#D9D9D9"
            />
          </svg>
        </Box>
      </Box>
      <Box>
        {" "}
        {/* <Select
          onChangeHandler={(event) =>
            dispatchOrderBookEvent({
              type: "UPDATE_TICKET_SIZE",
              payload: event.target.value
            })
          }
          value={state.ticket}
          values={state.GroupArray}
        /> */}
      </Box>
    </Box>
  );
};

export default React.memo(AskOrbids);
