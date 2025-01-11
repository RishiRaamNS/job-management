"use client";
import React, { useState } from "react";
import { Grid, Input, RangeSlider, Text, Flex, Select } from "@mantine/core";
import classes from "./Filter.module.css";

function Filter() {
  const [startSalary, setStartSalary] = useState(0);
  const [endSalary, setEndSalary] = useState(150);
  const [selectedJobType, setSelectedJobType] = useState(" ");
  return (
    <Grid grow mx={100}>
      <Grid.Col span={"content"} display="flex" className={classes.flex}>
        <img src="/search.svg" alt="search" width={20} height={20} />
        <Input
          variant="unstyled"
          placeholder="Search By Job Title, Role"
          ml={10}
          w={200}
        />
      </Grid.Col>
      <Grid.Col span={"content"} className={classes.flex}>
        <img src="/location.svg" alt="location" />
        <Input
          variant="unstyled"
          placeholder="Preferred Location"
          ml={10}
          w={200}
        />
      </Grid.Col>
      <Grid.Col span={"content"} className={classes.flex}>
        <img src="/jobtype.svg" alt="Job Type" />
        <Select
          searchable
          data={["Internship"]}
          placeholder="Job Type"
          styles={{
            input: { border: "none" }, // Remove the border
          }}
          clearable
          onChange={(_value, option) => console.log(_value)}
        />
      </Grid.Col>
      <Grid.Col span={3} ml={20}>
        <Flex gap={40} mt={-10} mb={20}>
          <Text fw={600}>Salary Per Month</Text>
          <Text fw={600}>
            ₹{startSalary}k - ₹{endSalary}k
          </Text>
        </Flex>
        <RangeSlider
          min={10}
          max={150}
          step={10}
          w={300}
          color="black"
          size={"xs"}
          thumbSize={15}
          minRange={20}
          label={null}
          onChange={(values) => {
            setStartSalary(values[0]);
            setEndSalary(values[1]);
          }}
        />
      </Grid.Col>
    </Grid>
  );
}

export default Filter;
