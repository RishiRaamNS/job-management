"use client";
import { Modal, Button, Grid, TextInput } from "@mantine/core";
import React from "react";
import { useDisclosure } from "@mantine/hooks";
import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  firstName: string;
}

function CreateJob() {
  const [opened, { open, close }] = useDisclosure(false);
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Create Job Opening"
        centered
        withCloseButton={false}
        styles={{
          title: {
            fontWeight: "600",
            textAlign: "center",
            margin: "0 auto", // Set font weight
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid grow>
            <Grid.Col span={6}>
              <TextInput
                placeholder="Full Stack Developer"
                label="Enter Job Title"
                {...register("firstName")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput placeholder="Amazon, Swiggy" label="Company Name" />
            </Grid.Col>
          </Grid>
          <input type="submit" placeholder="submit"/>
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
