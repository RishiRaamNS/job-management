"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Grid, Input, RangeSlider, Text, Flex, Select } from "@mantine/core";
import classes from "./Filter.module.css";
import { Job } from "@/types/job";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { resetFilteredData, setFilteredData } from "@/redux/filteredJobsSlice";

function Filter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [startSalary, setStartSalary] = useState(0);
  const [endSalary, setEndSalary] = useState(200);

  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.jobs
  ) as { data: Job[]; loading: boolean; error: string };

  const filteredData = useMemo(() => {
    return data.filter((job) => {
      const matchesSearchTerm =
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation = location
        ? job.location.toLowerCase().includes(location.toLowerCase())
        : true; // Only filter location if it's provided

      const matchesJobType = selectedJobType
        ? job.jobType === selectedJobType
        : true; // Only filter jobType if selectedJobType is provided

      const matchesSalary =
        job.salaryMax >= startSalary * 1000 &&
        job.salaryMin <= endSalary * 1000;

      return (
        matchesSearchTerm && matchesLocation && matchesJobType && matchesSalary
      );
    });
  }, [data, searchTerm, location, selectedJobType, startSalary, endSalary]);

  useEffect(() => {
    dispatch(setFilteredData(filteredData));
  }, [filteredData, dispatch]);

  useEffect(() => {
    dispatch(resetFilteredData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <Grid grow mx={100}>
      <Grid.Col span={"content"} display="flex" className={classes.flex}>
        <img src="/search.svg" alt="search" width={20} height={20} />
        <Input
          variant="unstyled"
          placeholder="Search By Job Title, Role"
          ml={10}
          w={200}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Grid.Col>
      <Grid.Col span={"content"} className={classes.flex}>
        <img src="/location.svg" alt="location" />
        <Input
          variant="unstyled"
          placeholder="Preferred Location"
          ml={10}
          w={200}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Grid.Col>
      <Grid.Col span={"content"} className={classes.flex}>
        <img src="/jobtype.svg" alt="Job Type" />
        <Select
          searchable
          data={["Internship", "Full-time", "Part-time", "Contract"]}
          placeholder="Job Type"
          styles={{
            input: { border: "none" }, // Remove the border
          }}
          clearable
          value={selectedJobType}
          onChange={(value) => setSelectedJobType(value || "")}
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
          max={200}
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
