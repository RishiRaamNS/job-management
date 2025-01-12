"use client";
import {
  Modal,
  Button,
  Grid,
  TextInput,
  Select,
  Text,
  Flex,
  Input,
  InputLabel,
  Textarea,
} from "@mantine/core";
import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { DateInput } from "@mantine/dates";
import axios from "axios";
import { Job } from "@/types/job";

function CreateJob() {
  const [opened, { open, close }] = useDisclosure(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Job>({
    defaultValues: {
      salaryMin: 0,
      salaryMax: 0,
      experienceMax: 0,
      experienceMin: 0,
    },
  });
  const onSubmit: SubmitHandler<Job> = async (data) => {
    try {
      const response = await axios.post(
        "https://jobs-hofi.onrender.com/api/jobs/create",
        data
      );
      console.log(response.data);
      reset();
      close();
    } catch (e) {
      console.log("Error:", e);
    }
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size={"lg"}
        title="Create Job Opening"
        centered
        withCloseButton={false}
        styles={{
          title: {
            fontWeight: "600",
            margin: "0 auto", 
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid grow>
            <Grid.Col span={6}>
              <TextInput
                withAsterisk
                placeholder="Full Stack Developer"
                label="Enter Job Title"
                {...register("jobTitle", { required: "Job title is required" })}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                withAsterisk
                placeholder="Amazon, Swiggy"
                label="Company Name"
                {...register("companyName", {
                  required: "Company name is required",
                })}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                withAsterisk
                placeholder="Choose Preferred Location"
                label="Location"
                {...register("location", { required: "Location is required" })}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Controller
                name="jobType"
                control={control}
                rules={{ required: "Job type is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    searchable
                    withAsterisk
                    data={["Internship", "Full-time", "Part-time", "Contract"]}
                    placeholder="Job Type"
                    label="Job Type"
                    error={errors.jobType && errors.jobType.message}
                    clearable
                  />
                )}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <InputLabel>Salary Range</InputLabel>
              <Flex gap={10}>
                <Input
                  w={120}
                  placeholder="₹0"
                  leftSection={<img src="/salary.svg" alt="salary" />}
                  {...register("salaryMin", {
                    required: "Minimum salary is required",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Minimum salary cannot be less than ₹0",
                    },
                  })}
                  error={
                    errors.salaryMin && <Text>{errors.salaryMin.message}</Text>
                  }
                />
                <Input
                  w={140}
                  placeholder="₹1,00,000"
                  leftSection={<img src="/salary.svg" alt="salary" />}
                  {...register("salaryMax", {
                    required: "Maximum salary is required",
                    valueAsNumber: true,
                    max: {
                      value: 1000000,
                      message: "Maximum salary cannot be more than ₹10,00,000",
                    },
                  })}
                  error={
                    errors.salaryMax && <Text>{errors.salaryMax.message}</Text>
                  }
                />
              </Flex>
            </Grid.Col>
            <Grid.Col span={6}>
              <Controller
                name="applicationDeadline"
                control={control}
                render={({ field }) => (
                  <DateInput
                    {...field}
                    placeholder=" "
                    rightSection={<img src="/calendar.svg" alt="calendar" />}
                    label="Application Deadline"
                    popoverProps={{ withinPortal: true }}
                    error={
                      errors.applicationDeadline &&
                      errors.applicationDeadline.message
                    }
                  />
                )}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Controller
                name="workType"
                control={control}
                rules={{ required: "Job type is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    searchable
                    data={["On-Site", "Remote", "Hybrid"]}
                    placeholder="Work Type"
                    label="Work Type"
                    error={errors.jobType && errors.jobType.message}
                    clearable
                  />
                )}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <InputLabel>Experience Required</InputLabel>
              <Flex gap={10}>
                <Input
                  w={120}
                  placeholder="Min experience"
                  {...register("experienceMin", {
                    required: "Minimum experience is required",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Minimum experience cannot be less than 0",
                    },
                  })}
                  error={
                    errors.experienceMin && (
                      <Text>{errors.experienceMin.message}</Text>
                    )
                  }
                />
                <Input
                  w={140}
                  placeholder="Max experience"
                  {...register("experienceMax", {
                    required: "Maximum experience is required",
                    valueAsNumber: true,
                    max: {
                      value: 20,
                      message: "Maximum salary cannot be more than 20 years",
                    },
                  })}
                  error={
                    errors.experienceMax && (
                      <Text>{errors.experienceMax.message}</Text>
                    )
                  }
                />
              </Flex>
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                label="Job Description"
                placeholder="Please share a description to let the candidate know more about the job role"
                autosize
                minRows={4}
                maxRows={10}
                {...register("jobDescription", {
                  required: "Job description is required",
                })}
                error={errors.jobDescription && errors.jobDescription.message}
              />
            </Grid.Col>
          </Grid>
          <Button type="submit" mt={10}>
            Publish
          </Button>
        </form>
      </Modal>

      <Button
        radius={122}
        variant="gradient"
        gradient={{ from: "#A128FF", to: "#6100AD", deg: 90 }}
        onClick={open}
      >
        Create Jobs
      </Button>
    </>
  );
}

export default CreateJob;
