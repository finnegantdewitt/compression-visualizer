import React from 'react';

export type CommonArgs = {
  readonly fileText: string;
  readonly setFileText: React.Dispatch<React.SetStateAction<string>>;
};
