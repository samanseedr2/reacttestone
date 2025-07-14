import { useAuth } from "./AuthComponent";

type FileData = {
  file: {
    name: string;
    type: string;
    size: number;
  };
};

function FileComponent({ file: { name, type, size } }: FileData) {
  const user = useAuth();
  return (
    <div style={{ paddingTop: "10px" }}>
      <h4>User Name {user.name}</h4>
      <p>File Name : {name}</p>
      <p>File Name : {type}</p>
      <p>File Name : {size}</p>
    </div>
  );
}

export default FileComponent;
