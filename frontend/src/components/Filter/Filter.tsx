"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  Grid,
  Input,
  RangeSlider,
  Text,
  Flex,
  Select,
  Autocomplete,
} from "@mantine/core";
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
  const [locations, setLocations] = useState<string[]>([]);
  const [companyNames, setCompanyNames] = useState<string[]>([]);
  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.jobs
  ) as { data: Job[]; loading: boolean; error: string };

  useEffect(() => {
    if (data) {
      const uniqueLocations = [...new Set(data.map((job) => job.location))];
      const uniqueCompanyNames = [
        ...new Set(data.map((job) => job.companyName)),
      ];
      const uniqueJobTitles = [...new Set(data.map((job) => job.jobTitle))];

      setLocations(uniqueLocations);
      setCompanyNames(uniqueCompanyNames);
      setJobTitles(uniqueJobTitles);
    }
  }, [data]);

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
    <Grid grow mx={{ lg: 100 }}>
      <Grid.Col span={"content"} display="flex" className={classes.flex}>
        <img src="/search.svg" alt="search" width={20} height={20} />
        <Autocomplete
          variant="unstyled"
          placeholder="Search By Job Title, Role"
          ml={10}
          w={200}
          value={searchTerm}
          limit={8}
          onChange={setSearchTerm}
          data={jobTitles.concat(companyNames)}
          comboboxProps={{
            transitionProps: { transition: "pop", duration: 200 },
          }}
        />
      </Grid.Col>
      <Grid.Col span={"content"} className={classes.flex}>
        <img src="/location.svg" alt="location" />
        <Autocomplete
          variant="unstyled"
          placeholder="Preferred Location"
          ml={10}
          w={200}
          data={locations}
          value={location}
          onChange={setLocation}
          limit={8}
          comboboxProps={{
            transitionProps: { transition: "pop", duration: 200 },
          }}
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
      <Grid.Col span={3} ml={{ lg: 20 }}>
        <Flex gap={40} mt={-10} mb={20}>
          <Text fw={600}>Salary Per Month</Text>
          <Text fw={600}>
            ₹{startSalary}k - ₹{endSalary}k
          </Text>
        </Flex>
        <RangeSlider
          mt={{ sm: 30 }}
          min={10}
          max={200}
          step={10}
          w={300}
          color="black"
          size={"3"}
          thumbSize={13}
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
