import React, { Fragment } from "react";
import Splitter from '@devbookhq/splitter';
import HoverStyleBodge from "./HoverStyleBodge";
import TextPanel from "./TextPanel";
import HexPanel from "./HexPanel";


const LyricSplit = ({lyrics}: {readonly lyrics: string}) => {
  return (
    <Fragment>
      <HoverStyleBodge></HoverStyleBodge>
      <Splitter>
        <TextPanel text={lyrics}></TextPanel>
        <HexPanel text={lyrics}></HexPanel>
      </Splitter>
    </Fragment>
  );
};
export default LyricSplit;
