import React, {
  useState,
  useCallback,
  useEffect,
  useMemo
} from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid
} from '@mui/material';
import axios from 'axios';
import './App.css';
import { backendUrl } from './config';
import SkillSelectListView from 'src/views/skills/SkillSelectListView';
import GlobalStyles from 'src/components/GlobalStyles';
import SkillSearchResultView from 'src/views/skills/SkillSearchResultView';

function App() {
  const [skills, setSkills] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([{
    name: 'angular',
    rate: 5
  }]);
  const [postings, setPostings] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getAllSkills = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/skills`);

      if (response?.data) {
        setSkills(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const searchSkills = useCallback(async () => {
    try {
      setLoading(true);
      const skillData = selectedSkills.reduce((a, v) => ({
        ...a,
        [v.name]: v.rate
      }), {});

      const response = await axios.get(`${backendUrl}/postings/search/skills`, {
        params: {
          skill: skillData
        }
      });

      if (response?.data) {
        setPostings(response.data.results);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedSkills]);

  const handleRemoveSkill = (searchIdx) => {
    setSelectedSkills((prev) => prev.filter((prev, idx) => idx !== searchIdx));
  };

  const handleAddSkill = (rate) => {
    const selectedSkillNames = selectedSkills.map(({ name }) => name);
    const filteredSkills = skills?.filter(skill => !selectedSkillNames.includes(skill.slug));

    setSelectedSkills((prev) => ([
      ...prev,
      { name: filteredSkills[0]?.slug, rate: rate ?? 5 }
    ]));
  };

  const handleChangeSkill = (searchIdx, type, value) => {
    if (selectedSkills.find(selected => selected.name === value) && type === 'key') {
      alert('You already have the skill');
    } else {
      setSelectedSkills((prev) => prev.map((v, idx) => idx === searchIdx
        ? type === 'key'
          ? {...prev[idx], name: value}
          : {...prev[idx], rate: value}
        : v
      ));
    }
  };

  useEffect(() => {
    getAllSkills();
  }, [getAllSkills]);

  return (
    <>
      <GlobalStyles />
      <Container>
        <Box my={5}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Alert severity="info">
                Select and rate your skills (max: 10 skills)
              </Alert>
              <SkillSelectListView
                skills={skills}
                selectedSkills={selectedSkills}
                onAdd={handleAddSkill}
                onChange={handleChangeSkill}
                onRemove={handleRemoveSkill}
                onSearch={searchSkills}
                isAddDisabled={selectedSkills.length === 10}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              {
                isLoading
                  ? <CircularProgress />
                  : <SkillSearchResultView postings={postings} />
              }
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default App;
