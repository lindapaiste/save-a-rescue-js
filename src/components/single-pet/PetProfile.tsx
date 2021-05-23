import "./pet-profile.less";
import React, { useEffect } from "react";
import { Col, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import {
  useDispatch,
  useEntitiesSelector,
  useSelector,
} from "../../services/store";
import {
  getAnimalAttributes,
  getAnimalImages,
  getAnimalOrgId,
  getAnimalSpecies,
} from "../../services/rescuegroups-api/entities/selectors";
import { useRequireAnimal } from "../../services/rescuegroups-api/entities/useRequireEntity";
import { ConnectedShelterBox } from "./ShelterBox";
import { Loading } from "../loading/Loading";
import { Health, IdealHome, Personality } from "./FactBox";
import { usePetSeoTitle } from "../../services/seo/usePetSeoTitle";
import { FetchError } from "../loading/FetchError";
import { speciesLabel } from "../../services/species/species";
import { SearchLink } from "../../services/routing/links/SearchLink";
import { IconAndText } from "../../util/IconAndText";
import { RecentlyViewed } from "./RecentlyViewed";
import { ProfileCarousel } from "./ProfileCarousel";
import {
  selectLastSearch,
  viewedPet,
} from "../../services/recently-viewed/recent";
import { AgeSex } from "./AgeSex";
import { Breed } from "./Breed";
import { Description } from "./Description";
import { Tracker } from "./Tracker";

export interface Props {
  id: string;
}

// TODO: need to show adopted vs available - example adopted: http://localhost:3000/adoptable-dogs-cats/pet/1742442
/**
 * component handles fetching, error and loading states
 */
export const PetProfile = ({ id }: Props) => {
  const images = useEntitiesSelector(getAnimalImages(id));

  const attributes = useEntitiesSelector(getAnimalAttributes(id));

  const orgId = useEntitiesSelector(getAnimalOrgId(id));

  const species = useEntitiesSelector(getAnimalSpecies(id));

  const { isError, error, load, isLoading } = useRequireAnimal(id);

  const lastSearch = useSelector(selectLastSearch);

  usePetSeoTitle({
    attributes: attributes || {},
    orgId: orgId || "",
    species,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewedPet(id));
  }, [dispatch, id]);

  if (isError) {
    return <FetchError title="Error Loading Pet" load={load} error={error} />;
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="pet-profile">
      <div className="back">
        {lastSearch ? (
          <Link to={lastSearch}>
            <IconAndText
              icon={<ArrowLeftOutlined />}
              text="Return to Search Results"
            />
          </Link>
        ) : (
          <SearchLink
            species={species}
            // zip={shelter?.postalcode?.toString()}
          >
            <IconAndText
              icon={<ArrowLeftOutlined />}
              text={`Search ${speciesLabel(species, "plural")}`}
            />
          </SearchLink>
        )}
      </div>
      {images.length > 0 && <ProfileCarousel images={images} />}
      <div className="top-titles">
        <h1 className="pet-name">
          <span className="meet">Meet</span>{" "}
          <span className="name">{attributes?.name}</span>
        </h1>
        <Breed {...attributes} />
        <AgeSex {...attributes} species={species} />
      </div>

      <Row className="profile-body">
        <Col xs={24} sm={24} md={6} lg={8}>
          <IdealHome {...attributes} species={species} />
          <Health {...attributes} />
          <Personality {...attributes} />
        </Col>
        <Col xs={24} sm={24} md={18} lg={16}>
          <Description text={attributes?.descriptionText} />

          {orgId && (
            <div>
              <h3>Get In Touch</h3>
              <ConnectedShelterBox id={orgId} />
            </div>
          )}
          <Tracker id={id} />
        </Col>
      </Row>
      <RecentlyViewed ignored={id} />
    </div>
  );
};

/**
 * Page gets the id from the URL
 */
export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  return <PetProfile id={id} />;
}
