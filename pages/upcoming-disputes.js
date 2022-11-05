import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DisputesList from "../components/disputeResolution/DisputesList";
import NotArbiter from "../components/NotArbiter";
import RenderOnArbiter from "../components/RenderOnArbiter";
import Meta from "../components/seo/Meta";
import Unauthorized from "../components/Unauthorized";
import { useResolutioContext } from "../context/ResolutioContext";
import DisputePool from "../integrations/DisputePool";
const UpcomingDisputes = () => {
  const { address } = useResolutioContext();
  const [upComingDisputes, setUpComingDisputes] = useState([]);

  useEffect(() => {
    const asyncGetDisputes = async () => {
      if (!address) {
        return;
      }
      const disputeSystem = new DisputePool();
      const disputes = await disputeSystem.getNewDisputes();
      let mappedDisputes = disputes.map((dispute) => {
        const {
          arbiterCount,
          createdAt,
          creator,
          disputeId,
          disputePool,
          selectedArbiters,
          state,
          uri,
          winningProposal,
        } = dispute;
        return {
          title: "",
          description: "",
          hasStaked: disputePool.includes(address),
          arbiterCount,
          createdAt,
          creator,
          disputeId,
          disputePool,
          selectedArbiters,
          state,
          uri,
          winningProposal,
        };
      });
      setUpComingDisputes(mappedDisputes);
      console.log("getDisputes", disputes);

      Promise.all(
        disputes.map((dispute) => fetch(`${dispute.uri}/dispute.json`))
      )
        .then(function (responses) {
          // Get a JSON object from each of the responses
          return Promise.all(
            responses.map(function (response) {
              if (response.status === 200) return response.json();
              return null;
            })
          );
        })
        .catch(function (error) {
          console.log("api error", error);
          return error;
        })
        .then(function (data) {
          // Log the data to the console
          console.log("multi data", data);
          mappedDisputes.forEach((element, index) => {
            element.additionalDetails = data[index];
          });
          console.log(mappedDisputes);
        })
        .catch(function (error) {
          console.log(error);
        });

      console.timeEnd("getDisputes");
    };
    asyncGetDisputes();
  }, [address]);

  return (
    <>
      <Meta title="Upcoming Disputes" />
      <RenderOnArbiter>
        <>
          <Typography variant="h1">Upcoming Disputes</Typography>
          <DisputesList disputes={upComingDisputes} />
        </>
      </RenderOnArbiter>
      <NotArbiter />
      <Unauthorized />
    </>
  );
};

export default UpcomingDisputes;
