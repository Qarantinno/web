import React, { ChangeEvent, useState } from 'react';

import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Fab from '@material-ui/core/Fab';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Layout } from '../../components/Layout';
import { CrowdLevelSlider } from './components/CrowdLevelSlider';

import { PLACE_SIZES } from '../../constants/PLACE_SIZES';
import { PlaceSizes } from '../../enums/PlaceSizes';
import { postShots } from '../../services/shots';

export const SharePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [placeKind, setPlaceKind] = useState<PlaceSizes>(PlaceSizes.MINI);
  const [crowdLevel, setCrowdLevel] = useState<number>(50);

  const { t } = useTranslation();

  function handlePlaceKindChanged({ target }: ChangeEvent<{ name?: string | undefined, value: unknown }>) {
    setPlaceKind(target.value as PlaceSizes);
  }

  function handleCrowdLevelChanged(level: number) {
    setCrowdLevel(level);
  }

  function shareTheCrowdInfo() {
    setLoading(true);

    postShots({
      people: crowdLevel,
      place: { modifier: placeKind }
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <Layout>
      <Box height={1} display="grid" gridRowGap={10} gridTemplateRows="1fr 1fr 1fr 1fr">
        <Container>
          <Link to="/">
            <Fab color="primary" aria-label="add" size="large">
              <ArrowBack fontSize="large" />
            </Fab>
          </Link>
        </Container>
        <Container>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="place-kind-label">
              {t("option-label-modifier")}
            </InputLabel>
            <Select
              id="place-kind"
              labelId="place-kind-label"
              onChange={handlePlaceKindChanged}
              value={placeKind}
              label={t("option-label-modifier")}
            >
              <MenuItem value="any">{t("option-modifier-any")}</MenuItem>
              {PLACE_SIZES.map((place) => (
                <MenuItem key={place} value={place}>
                  {t(`option-modifier-${place}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Container>
        <Container>
          <Box p={3}>
            <CrowdLevelSlider
              value={crowdLevel}
              onChange={handleCrowdLevelChanged}
            />
          </Box>
        </Container>
        <Container>
          <Box textAlign="center">
            <Button size="large" variant="contained" color="primary" onClick={shareTheCrowdInfo}>
              {loading ? <CircularProgress color="inherit" size={26} /> : t("btn-label-post")}
            </Button>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default SharePage;
