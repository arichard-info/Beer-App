import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import { getRequest } from "@/utils/api";
import Header from "@/components/pages/AddDrink/steps/Header";

import Input from "./Input";
import List from "./List";

const Search = ({ className, setStep }) => {
  const [totalCount, setTotalCount] = useState(false);
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({ search: "", page: 0 });

  useEffect(() => {
    const refresh = async () => {
      setLoading(true);
      let url = "/api/beers";
      url = url.concat(`?page=${params.page}`);
      if (params.search) url = url.concat(`&search=${params.search}`);
      const newBeers = await getRequest(url);
      if (newBeers.data && newBeers.data.beers) {
        if (params.page > 0)
          setBeers((beers) => [...beers, ...newBeers.data.beers]);
        else setBeers(newBeers.data.beers);
        setTotalCount(newBeers.data.totalCount || 0);
      }

      setLoading(false);
    };

    refresh();
  }, [params]);

  return (
    <div className={className}>
      <Header title="Ajoute ta bière">
        <Input
          onSearch={(newSearch) => {
            setParams({ search: newSearch, page: 0 });
          }}
        />
      </Header>

      <List
        beers={beers}
        loading={loading}
        totalCount={totalCount}
        setStep={setStep}
        onViewMore={() => {
          setParams({ ...params, page: params.page + 1 });
        }}
      />
    </div>
  );
};

export default styled(Search)(({ theme: { colors } }) => css``);
