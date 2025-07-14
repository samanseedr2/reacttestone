import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ChangeEvent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import axios from "../services/axios";
import FileComponent from "./FileComponent";
import useLocalStorage from "../hooks/useLocalStorage";
import useLog from "../hooks/useLog";

const dataSchema = z.object({
  fname: z.string().refine(
    (val) => {
      return val.length > 3;
    },
    {
      message: "Need more than 3 chanracters",
    }
  ),
  file: z
    .custom<FileList>((val) => val instanceof FileList, {
      message: "Not ifuiles",
    })
    .refine((val) => val.length > 0, {
      message: "Add atleast one file",
    })
    .refine((val) => val.length > 0 && val[0].type == "image/jpeg", {
      message: "Not an image",
    }),
});

type DataType = z.infer<typeof dataSchema>;

function FileUpload() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DataType>({
    resolver: zodResolver(dataSchema),
  });
  const [files, setFiles] = useState<FileList | null>(null);

  const [value, setValue] = useLocalStorage("test", "hello");

  const log = useLog();

  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const updateLocalStorage = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    log(e.target.value);
  };

  const uploadData: SubmitHandler<DataType> = async (data) => {
    const userData = new FormData();
    userData.append("fname", data.fname);
    for (let index in data.file) {
      userData.append("file", data.file[index]);
    }
    const result = await axios.post("http://localhost:3000/upload", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    console.log(result);
  };

  return (
    <div>
      <h1>File Upload</h1>
      <form onSubmit={handleSubmit(uploadData)}>
        <div>
          <input
            type="text"
            {...register("fname")}
            value={value as string}
            onChange={updateLocalStorage}
          />
          {errors.fname?.message}
        </div>
        <div>
          <input
            type="file"
            {...register("file")}
            multiple
            onChange={onFileUpload}
          />
          {errors.file?.message}
        </div>
        <button type="submit">{isSubmitting ? "Submitting" : "Submit"}</button>
      </form>
      <div>
        {files &&
          Array.from(files).map((file, index) => (
            <FileComponent key={index} file={file} />
          ))}
      </div>
    </div>
  );
}

export default FileUpload;
