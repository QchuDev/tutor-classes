/// <reference types="vite/client" />

declare module "@catalog" {
  const value: {
    presentations: Array<{
      id: string;
      title: string;
      subject: string;
      description: string;
      path: string;
    }>;
  };
  export default value;
}
