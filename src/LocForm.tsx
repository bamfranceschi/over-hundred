import React from "react";
import { useForm } from "react-hook-form";

type LocState = {
  city: string;
  state?: string;
  country: string;
};

function LocForm(props: {
  loc: LocState;
  setLoc: React.Dispatch<React.SetStateAction<LocState>>;
  handleSubmit: (e: any) => void;
}) {
  const { register, errors, formState } = useForm({ mode: "onChange" });
  const { isDirty, isValid } = formState;

  const handleChange = (e: any) => {
    props.setLoc({
      ...props.loc,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="city"
          ref={register({ required: true })}
          value={props.loc.city}
          onChange={handleChange}
        />
        {errors.city && "City is required"}
        <input
          type="text"
          name="state"
          value={props.loc.state}
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          ref={register({ required: true })}
          value={props.loc.country}
          onChange={handleChange}
        />
        {errors.country && "Country is required"}
      </form>
      <button
        disabled={!isDirty || (isDirty && !isValid)}
        type="submit"
        onClick={props.handleSubmit}
      >
        Go
      </button>
    </div>
  );
}

export default LocForm;
