import { Days } from "../../Models/Days.model";
import {
  Form,
  Label,
  Select,
  Input,
  Option,
  FieldContainer,
  SubmitButton,
} from "./LessonForm.styled";
import { useForm } from "react-hook-form";

export default function LessonForm({
  submitHandler,
  defaultValues = null,
}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    reValidateMode: "onChange",
    ...(defaultValues && { defaultValues }),
  });

  const onSubmit = (data: any) => console.log(data);

  const renderDaysOptions = () =>
    Object.keys(Days)
      .filter((day) => isNaN(Number(day)))
      .map((dayName, index) => (
        <Option value={index} key={dayName}>
          {dayName}
        </Option>
      ));

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FieldContainer hasError={errors.dayIndex && touchedFields.dayIndex}>
        <Label htmlFor="dayIndex">Day</Label>
        <Select {...register("dayIndex", { required: true })}>
          {renderDaysOptions()}
        </Select>
      </FieldContainer>

      <FieldContainer hasError={errors.subject && touchedFields.subject}>
        <Label htmlFor="subject">Subject</Label>
        <Input type="text" {...register("subject", { required: true })} />
      </FieldContainer>

      <FieldContainer hasError={errors.description && touchedFields.description}>
        <Label htmlFor="description">Description</Label>
        <Input type="text" {...register("description", { required: true })} />
      </FieldContainer>

      <SubmitButton type="submit" />
    </Form>
  );
}
