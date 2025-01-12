"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  Grid,
  RangeSlider,
  Text,
  Flex,
  Select,
  Autocomplete,
} from "@mantine/core";
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
        : true;

      const matchesJobType = selectedJobType
        ? job.jobType === selectedJobType
        : true;

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
    <Grid p="md">

      <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
        <Flex align="center" gap="sm">
          <img src="/search.svg" alt="search" className="w-5 h-5" />
          <Autocomplete
            variant="unstyled"
            placeholder="Search By Job Title, Role"
            value={searchTerm}
            limit={8}
            onChange={setSearchTerm}
            data={jobTitles.concat(companyNames)}
            className="w-full"
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
          />
        </Flex>
      </Grid.Col>

      {/* Location Input */}
      <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
        <Flex align="center" gap="sm">
          <img src="/location.svg" alt="location" className="w-5 h-5" />
          <Autocomplete
            variant="unstyled"
            placeholder="Preferred Location"
            data={locations}
            value={location}
            onChange={setLocation}
            limit={8}
            className="w-full"
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
          />
        </Flex>
      </Grid.Col>

      {/* Job Type Select */}
      <Grid.Col span={{ base: 12, sm: 6, lg: 2 }}>
        <Flex align="center" gap="sm">
          <img src="/jobtype.svg" alt="Job Type" className="w-5 h-5" />
          <Select
            searchable
            data={["Internship", "Full-time", "Part-time", "Contract"]}
            placeholder="Job Type"
            className="w-full"
            styles={{
              input: { border: "none" },
            }}
            clearable
            value={selectedJobType}
            onChange={(value) => setSelectedJobType(value || "")}
          />
        </Flex>
      </Grid.Col>

      {/* Salary Range */}
      <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
        <Flex direction="column" gap="md">
          <Flex justify="space-between" align="center">
            <Text fw={600}>Salary Per Month</Text>
            <Text fw={600}>
              ₹{startSalary}k - ₹{endSalary}k
            </Text>
          </Flex>
          <RangeSlider
            min={10}
            max={200}
            step={10}
            w="100%"
            color="black"
            size="3"
            thumbSize={13}
            minRange={20}
            label={null}
            onChange={(values) => {
              setStartSalary(values[0]);
              setEndSalary(values[1]);
            }}
          />
        </Flex>
      </Grid.Col>
    </Grid>
  );
}

export default Filter;
