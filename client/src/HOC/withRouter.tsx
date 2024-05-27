import { useParams } from 'react-router-dom';
import React from 'react';

// Define the WithRouterProps interface properly
export interface WithRouterProps {
  params: Record<string, string>;
  // Add other properties if necessary
}

const withRouter = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithRouterProps>
) => (props: P) => {
  const params = useParams<Record<string, string>>();
  // etc... other react-router-dom v6 hooks

  return <WrappedComponent {...props} params={params} />;
};

export default withRouter ;
