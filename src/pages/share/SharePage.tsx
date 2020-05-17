import React, { ChangeEvent, useState } from 'react';

import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Fab from '@material-ui/core/Fab';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Layout } from '../../components/Layout';
import { PLACE_SIZES } from '../../constants/PLACE_SIZES';
import { PlaceSizes } from '../../enums/PlaceSizes';
import { postShots } from '../../services/shots/postShots';

import { CrowdLevelSlider } from './components/CrowdLevelSlider';

export const SharePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [placeSize, setPlaceSize] = useState<PlaceSizes>(PlaceSizes.MINI);
  const [crowdLevel, setCrowdLevel] = useState<number>(50);

  const { t } = useTranslation();

  function handlePlaceSizeChanged({ target }: ChangeEvent<{ name?: string | undefined, value: unknown }>) {
    setPlaceSize(target.value as PlaceSizes);
  }

  function handleCrowdLevelChanged(level: number) {
    setCrowdLevel(level);
  }

  function shareTheCrowdInfo() {
    setLoading(true);

    postShots({
      people: crowdLevel,
      place: { modifier: placeSize }
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <Layout>
      <Box pt={2}>
        <Link to="/">
          <Fab color="primary" aria-label="add" size="large">
            <ArrowBack fontSize="large" />
          </Fab>
        </Link>
      </Box>
      <Box height={1}>
        <Box pt={10} pb={5}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="place-kind-label">
              {t("option-label-modifier")}
            </InputLabel>
            <Select
              id="place-kind"
              labelId="place-kind-label"
              onChange={handlePlaceSizeChanged}
              value={placeSize}
              label={t("option-label-modifier")}
            >
              {PLACE_SIZES.map((place) => (
                <MenuItem key={place} value={place}>
                  {t(`option-modifier-${place}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box pt={5} pb={5} pl={3} pr={3}>
          <CrowdLevelSlider
            value={crowdLevel}
            onChange={handleCrowdLevelChanged}
          />
        </Box>
        <Box pt={5} pb={5} textAlign="center">
          <Button size="large" variant="contained" color="primary" onClick={shareTheCrowdInfo}>
            {loading ? <CircularProgress color="inherit" size={26} /> : t("btn-label-post")}
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default SharePage;
