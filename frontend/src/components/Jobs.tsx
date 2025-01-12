"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Alert,
  Loader,
  Text,
  Flex,
  Button,
  Pagination,
} from "@mantine/core";
import { fetchJobs } from "@/redux/jobSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { Job } from "@/types/job";
import { resetFilteredData } from "@/redux/filteredJobsSlice";

function Jobs() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.jobs
  ) as { data: Job[]; loading: boolean; error: string };

  const filteredJobs = useSelector(
    (state: RootState) => state.filteredJobs.filteredData
  ) as Job[];

  const calculateAverageLPA = (
    minSalary: number,
    maxSalary: number
  ): string => {
    const yearlyMin = minSalary * 12; // Convert to yearly
    const yearlyMax = maxSalary * 12; // Convert to yearly
    const avgYearly = (yearlyMin + yearlyMax) / 2; // Average yearly salary
    const avgLPA = avgYearly / 100000; // Convert to Lakhs
    return avgLPA % 1 === 0 ? `${avgLPA} LPA` : `${avgLPA.toFixed(1)} LPA`;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const jobsToRender =
    filteredJobs && filteredJobs.length > 0 ? filteredJobs : data;

  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobsToRender.slice(indexOfFirstJob, indexOfLastJob);

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(resetFilteredData());
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Loader size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Alert title="Error" color="red">
          {error}
        </Alert>
      </div>
    );
  }

  const totalPages = Math.ceil(jobsToRender.length / itemsPerPage);
  console.log(data);
  return (
    <>
      <Grid mt={50} pl={{ lg: 45 }} justify="center" columns={4}>
        {currentJobs.map((job, index) => (
          <Grid.Col
            key={index}
            style={{
              maxWidth: "316px",
              flex: "0 0 auto",
              padding: "0 20px",
              margin: "0 20px",
              marginBottom: "50px",
            }}
            className="drop-shadow-[0 0 14px #D3D3D3 0.15] rounded-[12px]"
          >
            <div className="relative p-4 h-[74px] w-[74px] rounded-[13px] bg-gradient-to-b from-[#FEFEFD] to-[#F1F1F1] mb-4">
              <img
                src={`https://img.logo.dev/${job.companyName}.com?token=pk_JxMj4KHhSEedhL9_0LOJIw&format=png&retina=true`}
                alt="logo"
                width={50}
                height={50}
                className="absolute rounded-full"
              />
            </div>
            <Text fw={700}>{job.jobTitle}</Text>
            <Flex gap={10} direction={"row"} my={10}>
              <Flex gap={4} mr={4}>
                <img src="/experience.svg" alt="experience" />
                <Text size="sm" c="#5A5A5A" fw={500}>
                  {job.experienceMin}-{job.experienceMax}
                </Text>
              </Flex>
              <Flex gap={4} mr={4}>
                <img src="/work.svg" alt="Work Type" />
                <Text size="sm" c="#5A5A5A" fw={500}>
                  {job.workType}
                </Text>
              </Flex>
              <Flex gap={4}>
                <img src="/lpa.svg" alt="Lakhs Per Annum" />
                <Text size="sm" c="#5A5A5A" fw={500}>
                  {calculateAverageLPA(job.salaryMin, job.salaryMax)}
                </Text>
              </Flex>
            </Flex>
            <Text size="sm" c="#5A5A5A" fw={500} mt={14}>
              {job.jobDescription}
            </Text>
            <Button fullWidth mt={14}>
              Apply Now
            </Button>
          </Grid.Col>
        ))}
      </Grid>

      <Flex justify="center" mt={70} mb={70}>
        <Pagination
          value={currentPage}
          onChange={setCurrentPage}
          total={totalPages}
          size="md"
          color="blue"
        />
      </Flex>
    </>
  );
}

export default Jobs;
