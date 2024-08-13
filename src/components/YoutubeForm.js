import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const YoutubeForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
  } = useForm({
    defaultValues:
      // async () => {
      //   const response = await fetch(
      //     "https://jsonplaceholder.typicode.com/users/1"
      //   );
      //   const data = await response.json();
      //   return {
      //     username: "Batman",
      //     email: data.email,
      //     channel: "",
      //   };
      // },
      {
        username: "Batman",
        email: "",
        channel: "",
        social: {
          twitter: "",
          facebook: "",
        },
        phoneNumbers: ["", ""],
        phNumbers: [{ number: "" }],
        age: 0,
        dob: new Date(),
      },
  });
  const { errors, touchedFields, dirtyFields, isDirty } = formState;

  console.log({ touchedFields, dirtyFields, isDirty });

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (data) => {
    console.log("Form submitted", data);
  };

  const onError = (errors) => {
    console.log("Form errors", errors);
  };

  const handleGetValues = () => {
    // console.log("Get values", getValues());
    // console.log("Get values", getValues("social"));
    // console.log("Get values", getValues("social.twitter"));
    console.log("Get values", getValues(["username", "channel"]));
  };

  const handleSetValue = () => {
    setValue("username", "", {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  // const watchUsername = watch("username");
  // const watchUsername = watch(["username", "email"]);
  // const watchForm = watch();

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   });

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [watch]);

  return (
    <div>
      {/* <h2>Watched value : {watchUsername}</h2> */}
      {/* <h2>Watched value : {JSON.stringify(watchForm)}</h2> */}
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: { value: true, message: "Username is required" },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              //   validate: (fieldValue) =>
              //     fieldValue !== "admin@example.com" ||
              //     "Enter a different email address",
              validate: {
                notAdmin: (fieldValue) =>
                  fieldValue !== "admin@example.com" ||
                  "Enter a different email address",
                notBlacklisted: (fieldValue) =>
                  !fieldValue.endsWith("baddomain.com") ||
                  "This domain is not supported",
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", { required: "Channel is required" })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              // disabled: true,
              disabled: watch("channel") === "",
              required: "Enter twitter profile",
            })}
          />
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>

        <div className="form-control">
          <label htmlFor="primary-phone">Primary phone number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0")}
          />
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary phone number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1")}
          />
        </div>

        <div>
          <label>List of phone numbers</label>
          <div>
            {fields.map((field, index) => (
              <div className="form-control" key={field.id}>
                <input type="text" {...register(`phNumbers.${index}.number`)} />
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => append({ number: "" })}>
              Add phone number
            </button>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: { value: true, message: "Age is required" },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: { value: true, message: "Date of birth is required" },
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>

        <button>Submit</button>

        <button type="button" onClick={handleGetValues}>
          Get values
        </button>

        <button type="button" onClick={handleSetValue}>
          Set value
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
