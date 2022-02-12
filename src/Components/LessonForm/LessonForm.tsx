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
import { LessonType } from "../../Models/Lesson.model";

interface LessonFormProps{
  submitHandler: (data:LessonType)=>void,
  defaultValues: null | LessonType,
};

export default function LessonForm({
  submitHandler,
  defaultValues = null,
}: LessonFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    ...(defaultValues && { defaultValues }),
  });

  const onSubmit = (data: LessonType) =>
    submitHandler({
      ...(!data.id && {id:`${Math.round(Math.random() * 100000)}`}),
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
        <FieldContainer hasError={Boolean(errors.dayIndex)}>
          <Label htmlFor="dayIndex">Day</Label>
          <Select disabled={Boolean(defaultValues)} {...register("dayIndex", { required: true })}>
            {renderDaysOptions()}
          </Select>
        </FieldContainer>

        <FieldContainer hasError={Boolean(errors.subject)}>
          <Label htmlFor="subject">Subject</Label>
          <Input type="text" {...register("subject", { required: true })} />
        </FieldContainer>

        <FieldContainer hasError={Boolean(errors.description)}>
          <Label htmlFor="description">Description</Label>
          <Input type="text" {...register("description", { required: true })} />
        </FieldContainer>

        <SubmitButton type="submit" />
      </Form>
    </>
  );
}
