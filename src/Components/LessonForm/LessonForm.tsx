import { Days } from "../../Models/Days.model";
import {
  Form,
  Label,
  Select,
  Input,
  Option,
  FieldContainer,
  SubmitButton,
  FormHeading,
} from "./LessonForm.styled";
import { useForm } from "react-hook-form";

export default function LessonForm({
  submitHandler,
  defaultValues = null,
}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    ...(defaultValues && { defaultValues }),
  });

  const onSubmit = (data: any) =>
    submitHandler({
      id: `${Math.round(Math.random() * 100000)}`,
      ...data,
    });

  const renderDaysOptions = () =>
    Object.keys(Days)
      .filter((day) => isNaN(Number(day)))
      .map((dayName, index) => (
        <Option value={index} key={dayName}>
          {dayName}
        </Option>
      ));

  const renderHeading = () =>
    defaultValues ? (
      <FormHeading>Update lesson</FormHeading>
    ) : (
      <FormHeading>Add new lesson</FormHeading>
    );

  return (
    <>
      {renderHeading()}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FieldContainer hasError={errors.dayIndex}>
          <Label htmlFor="dayIndex">Day</Label>
          <Select disabled={Boolean(defaultValues)} {...register("dayIndex", { required: true })}>
            {renderDaysOptions()}
          </Select>
        </FieldContainer>

        <FieldContainer hasError={errors.subject}>
          <Label htmlFor="subject">Subject</Label>
          <Input type="text" {...register("subject", { required: true })} />
        </FieldContainer>

        <FieldContainer hasError={errors.description}>
          <Label htmlFor="description">Description</Label>
          <Input type="text" {...register("description", { required: true })} />
        </FieldContainer>

        <SubmitButton type="submit" />
      </Form>
    </>
  );
}
