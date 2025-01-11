"use client";
import { Modal, Button } from "@mantine/core";
import React from "react";
import { useDisclosure } from "@mantine/hooks";

function CreateJob() {
  const [opened, { open, close }] = useDisclosure(false);
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
