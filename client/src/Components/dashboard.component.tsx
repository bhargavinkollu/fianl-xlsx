import React, {useEffect, useState} from "react";
import {NavLink, useSearchParams} from "react-router-dom";
import {DocumentNode, useApolloClient} from "@apollo/client";
import {Alert, Breadcrumb, Button, Col, Row, Stack, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faDownload, faHome, faTimes} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import {find} from 'lodash';
import {useFormik} from "formik";
import {GET_DASHBOARD, GET_DIVISION_BY_MEMBER_ID, GET_DIVISION_BY_SHG_ID} from "../../../../constants/queries";
import * as XLSX from "xlsx";
import {CommonUtil} from "../../../helper/utils/common.util";

const reportOptions: { label: string; value: string }[] = [
  {value: 'SAVINGS_INFO', label: 'Savings Information'},
  {value: 'LOANS_FROM_OTHER_INSTITUTIONS', label: 'Loans From Other Institutions'},
  {value: 'LOANS_TO_MEMBERS', label: 'Loans To Members'},
  {value: 'INCOMES', label: 'Incomes'},
  {value: 'EXPENDITURE', label: 'Expenditure'},
  {value: 'INVESTMENTS', label: 'Investments'},
  {value: 'OTHERS', label: 'Others'},
  {value: 'BALANCES', label: 'Balances'},
];
const currentDate = new Date();

const yearOptions = [
  {
    value: `${currentDate.getFullYear() - 3}`,
    label: `${currentDate.getFullYear() - 3}`
  },
  {
    value: `${currentDate.getFullYear() - 2}`,
    label: `${currentDate.getFullYear() - 2}`
  },
  {
    value: `${currentDate.getFullYear() - 1}`,
    label: `${currentDate.getFullYear() - 1}`
  },
  {
    value: `${currentDate.getFullYear()}`,
    label: `${currentDate.getFullYear()}`
  },
  {
    value: `${currentDate.getFullYear() + 1}`,
    label: `${currentDate.getFullYear() + 1}`
  },
  {
    value: `${currentDate.getFullYear() + 2}`,
    label: `${currentDate.getFullYear() + 2}`
  },
  {
    value: `${currentDate.getFullYear() + 3}`,
    label: `${currentDate.getFullYear() + 3}`
  }
];

const monthOptions = [
  {value: 1, label: 'January'},
  {value: 2, label: 'February'},
  {value: 3, label: 'March'},
  {value: 4, label: 'April'},
  {value: 5, label: 'May'},
  {value: 6, label: 'June'},
  {value: 7, label: 'July'},
  {value: 8, label: 'August'},
  {value: 9, label: 'September'},
  {value: 10, label: 'October'},
  {value: 11, label: 'November'},
  {value: 12, label: 'December'},
];

const DashboardComponent = () => {
  const commonUtil = new CommonUtil();
  const user = JSON.parse(localStorage.getItem('user') as string);

  const buildPermissionBasedUrl = () => {
    if (user?.role === 'STATE') {
      return `state=${user.state}`;
    } else if (user?.role === 'DISTRICT') {
      return `state=${user.state}&district=${user.district}`;
    } else if (user?.role === 'ULB') {
      return `state=${user.state}&district=${user.district}&ulbName=${user.ulbName}`
    }
  };

  const [searchParams, setSearchParams] = useSearchParams(`${commonUtil.isAdminOrStaff() ? '' : buildPermissionBasedUrl()}&select=${reportOptions[7].value}&fromYear=${yearOptions[3].value}&fromMonth=${monthOptions[currentDate.getUTCMonth()].value}&toYear=${yearOptions[3].value}&toMonth=${monthOptions[currentDate.getUTCMonth()].value}`);
  const [queryResult, setQueryResult] = useState({} as any);
  const client = useApolloClient();

  const [selectedReportOption, setSelectedReportOption] = useState(reportOptions[6]);
  const [selectedFromMonthOption, setSelectedFromMonthOption] = useState(monthOptions[currentDate.getUTCMonth()]);
  const [selectedFromYearOption, setSelectedFromYearOption] = useState(yearOptions[3]);
  const [commonQueryString, setCommonQueryString] = useState('');

  function getQueryData(query: DocumentNode) {
    const fromDate = `${searchParams.get('fromYear')}-${searchParams.get('fromMonth')}-01`;

    client.query({
      query: query,
      variables: {
        state: searchParams.get('state'),
        district: searchParams.get('district'),
        ulbName: searchParams.get('ulbName'),
        tlfName: searchParams.get('tlfName'),
        slfName: searchParams.get('slfName'),
        shgId: searchParams.get('shgId'),
        fromDate: fromDate,
      }
    }).then(result => {
      setQueryResult(result);
    }).catch(result => {
      setQueryResult(result);
    })
  }

  const buildUrl = (name: string) => {
    let url = `/manage/dashboard?${commonQueryString}`;

    if (!searchParams.get('state')) {
      url += `state=${name}`
    } else if (!searchParams.get('district')) {
      url += `state=${searchParams.get('state')}&district=${name}`
    } else if (!searchParams.get('ulbName')) {
      url += `state=${searchParams.get('state')}&district=${searchParams.get('district')}&ulbName=${name}`
    } else if (!searchParams.get('tlfName')) {
      url += `state=${searchParams.get('state')}&district=${searchParams.get('district')}&ulbName=${searchParams.get('ulbName')}&tlfName=${name}`
    } else if (!searchParams.get('slfName')) {
      url += `state=${searchParams.get('state')}&district=${searchParams.get('district')}&ulbName=${searchParams.get('ulbName')}&tlfName=${searchParams.get('tlfName')}&slfName=${name}`
    } else if (!searchParams.get('shgId')) {
      url += `state=${searchParams.get('state')}&district=${searchParams.get('district')}&ulbName=${searchParams.get('ulbName')}&tlfName=${searchParams.get('tlfName')}&slfName=${searchParams.get('slfName')}&shgId=${name}`
    }
    return url;
  };

  const searchForm = useFormik({
    initialValues: {
      shgId: '',
      memberId: '',
      errors: ''
    },
    onSubmit: async (values) => {
      if (values.shgId) {
        const divisionData = await client.query({
          query: GET_DIVISION_BY_SHG_ID,
          variables: {
            shgId: values.shgId
          }
        });

        if (divisionData?.data?.divisions?.nodes.length > 0) {
          const division = divisionData.data.divisions.nodes[0];
          setSearchParams(encodeURI(commonQueryString + `state=${division.state}&district=${division.district}&ulbName=${division.ulbName}&tlfName=${division.tlfName}&slfName=${division.slfName}&shgId=${values.shgId}`));
        } else {
          await searchForm.setFieldValue('errors', 'Unable to find SHG with id : ' + values.shgId)
        }
      } else if (values.memberId) {
        const divisionData = await client.query({
          query: GET_DIVISION_BY_MEMBER_ID,
          variables: {
            memberId: values.memberId
          }
        });

        if (divisionData?.data?.divisions) {
          const division = divisionData.data.divisions;
          setSearchParams(encodeURI(commonQueryString + `state=${division.state}&district=${division.district}&ulbName=${division.ulbName}&tlfName=${division.tlfName}&slfName=${division.slfName}&shgId=${division.shgId}`));
        } else {
          await searchForm.setFieldValue('errors', 'Unable to find SHG by member id : ' + values.shgId)
        }
      }
    }
  });

  const getDivisionTitle = () => {
    if (!searchParams.get('state')) {
      return 'State'
    } else if (!searchParams.get('district')) {
      return 'District'
    } else if (!searchParams.get('ulbName')) {
      return 'ULB Name'
    } else if (!searchParams.get('tlfName')) {
      return 'TLF Name'
    } else if (!searchParams.get('slfName')) {
      return 'SLF Name'
    }
  };

  useEffect(() => {
    const reportOptionSelected = find(reportOptions, {value: searchParams.get('select')}) as any;
    if (reportOptionSelected) {
      setSelectedReportOption(reportOptionSelected);
    }

    let fromMonthSelected = find(monthOptions, {value: Number(searchParams.get('fromMonth'))}) as any;
    if (fromMonthSelected) {
      setSelectedFromMonthOption(fromMonthSelected);
    }

    let fromYearSelected = find(yearOptions, {value: searchParams.get('fromYear')}) as any;
    if (fromYearSelected) {
      setSelectedFromYearOption(fromYearSelected);
    }

    setCommonQueryString(`select=${reportOptionSelected.value}&fromYear=${fromYearSelected.value}&fromMonth=${fromMonthSelected.value}&`);

    if (reportOptionSelected?.value === 'BALANCES') {
      getQueryData(GET_DASHBOARD)
    }
  }, [searchParams]);

  return (
    <div className='reports-wrapper'>
      <Row>
        <Col>
          <Stack direction="horizontal" gap={3}>
            <Breadcrumb>
              <Breadcrumb.Item
                href={`/manage/dashboard?${commonQueryString}&`}
                active={!searchParams.get('state')}
              >
                <FontAwesomeIcon icon={faHome}/>
              </Breadcrumb.Item>
              {(commonUtil.isAdminOrStaff() || user.role === 'STATE') && searchParams.get('state') &&
              <Breadcrumb.Item
                  href={`/manage/dashboard?${commonQueryString}&state=${searchParams.get('state')}`}
                  active={!searchParams.get('district')}
              >
                {searchParams.get('state')}
              </Breadcrumb.Item>}
              {(commonUtil.isAdminOrStaff() || user.role === 'DISTRICT') && searchParams.get('district') &&
              <Breadcrumb.Item
                  href={`/manage/dashboard?${commonQueryString}&state=${searchParams.get('state')}&district=${searchParams.get('district')}`}
                  active={!searchParams.get('ulbName')}
              >
                {searchParams.get('district')}
              </Breadcrumb.Item>}
              {(commonUtil.isAdminOrStaff() || user.role === 'ULB') && searchParams.get('ulbName') &&
              <Breadcrumb.Item
                  href={`/manage/dashboard?${commonQueryString}&state=${searchParams.get('state')}&district=${searchParams.get('district')}&ulbName=${searchParams.get('ulbName')}`}
                  active={!searchParams.get('tlfName')}
              >
                {searchParams.get('ulbName')}
              </Breadcrumb.Item>}
              {searchParams.get('tlfName') &&
              <Breadcrumb.Item
                  href={`/manage/dashboard?${commonQueryString}&state=${searchParams.get('state')}&district=${searchParams.get('district')}&ulbName=${searchParams.get('ulbName')}&tlfName=${searchParams.get('tlfName')}`}
                  active={!searchParams.get('slfName')}
              >
                {searchParams.get('tlfName')}
              </Breadcrumb.Item>}
              {searchParams.get('slfName') &&
              <Breadcrumb.Item
                  href={`/manage/dashboard?${commonQueryString}&state=${searchParams.get('state')}&district=${searchParams.get('district')}&ulbName=${searchParams.get('ulbName')}&tlfName=${searchParams.get('tlfName')}&slfName=${searchParams.get('slfName')}`}
                  active={!searchParams.get('shgId')}
              >
                {searchParams.get('slfName')}
              </Breadcrumb.Item>}
            </Breadcrumb>
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col>
          {
            searchForm?.values?.errors &&
            <Alert variant="danger">
              {searchForm?.values?.errors}
            </Alert>
          }
        </Col>
        <Col xs md={12}>
          <Row className='justify-content-between'>
            {/*<Col xs={12} md={2}>
							<div>
								<Select
									name="reportType"
									className={"react-select-container"}
									classNamePrefix="react-select"
									placeholder="Select Report Type"
									onChange={selectedOption => {
										if (selectedOption != null) {
											updateQueryParams('select', selectedOption.value);
											setSelectedReportOption(selectedOption)
										}
									}}
									value={selectedReportOption}
									options={reportOptions}
								/>
							</div>
						</Col>*/}
            <Col md={3}>
              {/*<Form noValidate onSubmit={searchForm.handleSubmit}>
								<InputGroup className="mb-3">
									<FormControl
										placeholder="Search By SHG Id"
										name='shgId'
										onChange={searchForm.handleChange}
										onBlur={searchForm.handleBlur}
										value={searchForm.values.shgId}
									/>
									<Button variant="primary" type='submit'>
										<FontAwesomeIcon icon={faSearch}/>
									</Button>
								</InputGroup>
							</Form>*/}
            </Col>
            <Col xs={12} md={6}>
              <Row className={'date-wrapper justify-content-end'}>
                <div className={'from-month'}>
                  <Select
                    name="fromMonth"
                    className={"react-select-container"}
                    classNamePrefix="react-select"
                    placeholder="Select Month"
                    onChange={selectedOption => {
                      if (selectedOption != null) {
                        updateQueryParams('fromMonth', String(selectedOption.value));
                        setSelectedFromMonthOption(selectedOption)
                      }
                    }}
                    value={selectedFromMonthOption}
                    options={monthOptions}
                  />
                </div>
                <div className={'from-year'}>
                  <Select
                    name="fromYear"
                    className={"react-select-container"}
                    classNamePrefix="react-select"
                    placeholder="Select Year"
                    onChange={selectedOption => {
                      if (selectedOption != null) {
                        updateQueryParams('fromYear', selectedOption.value);
                        setSelectedFromYearOption(selectedOption)
                      }
                    }}
                    value={selectedFromYearOption}
                    options={yearOptions}
                  />
                </div>
                <div className={'download-button'}>
                  <Button onClick={() => {
                    const table_elt = document.getElementById("table-wrapper");
                    const workbook = XLSX.utils.table_to_book(table_elt, {origin: 0});
                    const ws = workbook.Sheets["Sheet1"];
                    XLSX.utils.sheet_add_aoa(ws, [[]], {origin:0});
                    XLSX.writeFile(workbook, "Dashboard.xlsx");
                  }}>
                    <FontAwesomeIcon icon={faDownload}/>
                  </Button>
                </div>
                {/*-
								<div className={'to-month'}>
									<Select
										name="toMonth"
										className={"react-select-container"}
										classNamePrefix="react-select"
										placeholder="Select Month"
										onChange={selectedOption => {
											if (selectedOption != null) {
												updateQueryParams('toMonth', String(selectedOption.value));
												setSelectedToMonthOption(selectedOption)
											}
										}}
										value={selectedToMonthOption}
										options={monthOptions}
									/>
								</div>
								<div className={'to-year'}>
									<Select
										name="toYear"
										className={"react-select-container"}
										classNamePrefix="react-select"
										placeholder="Select Year"
										onChange={selectedOption => {
											if (selectedOption != null) {
												updateQueryParams('toYear', selectedOption.value);
												setSelectedToYearOption(selectedOption)
											}
										}}
										value={selectedToYearOption}
										options={yearOptions}
									/>
								</div>*/}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className='main-content-wrapper'>
        <Col>
          {selectedReportOption.value === 'BALANCES' &&
          <Table bordered striped hover responsive id={'table-wrapper'}>
              <thead>
              <tr>
                  <th>
                      S.No.
                  </th>
                {(searchParams.get('shgId') || searchParams.get('slfName')) &&
                <>
                    <th>SHG Id</th>
                    <th>SHG Name</th>
                </>}
                {!(searchParams.get('shgId') || searchParams.get('slfName')) &&
                <>
                    <th>{getDivisionTitle()}</th>
                    <th className='align-middle'>Total Count</th>
                    <th> Uploaded Count</th>
                    <th>Balance Count</th>
                </>}
                {(searchParams.get('shgId') || searchParams.get('slfName')) &&
                <>
                    <th className='align-middle'>Has Uploaded</th>
                </>}
              </tr>
              </thead>
              <tbody>
              {queryResult.data && queryResult?.data?.divisions?.map((data: any, index: number) => (
                <tr key={data.divisionName + index}>
                  <td>{index + 1}</td>
                  {(searchParams.get('shgId') || searchParams.get('slfName')) &&
                  <>
                      <td>{data.shgId}</td>
                  </>
                  }
                  <td className={'text-nowrap'}>
                    {!searchParams.get('slfName') &&
                    <NavLink className={'link'}
                             to={buildUrl(data.divisionName)}>{data.divisionName}</NavLink>}
                    {searchParams.get('slfName') && <span>{data.divisionName}</span>}
                  </td>
                  {!(searchParams.get('shgId') || searchParams.get('slfName')) &&
                  <>
                      <td>{data.shgCount}</td>
                      <td>{data.uploadedCount ?? 0}</td>
                      <td>{data.uploadedCount ? data.shgCount - data.uploadedCount : data.shgCount}</td>
                  </>}
                  {(searchParams.get('shgId') || searchParams.get('slfName')) &&
                  <>
                      <td className='align-middle'>
                        {(data?.uploadedCount && data.uploadedCount > 0) ? <FontAwesomeIcon icon={faCheck}/> :
                          <FontAwesomeIcon icon={faTimes}/>}
                      </td>
                  </>
                  }
                </tr>
              ))}
              </tbody>
          </Table>}
        </Col>
      </Row>
    </div>
  );

  function updateQueryParams(key: string, value: string) {
    let queryParams = Object.fromEntries([...searchParams]);
    queryParams[key] = value;
    setSearchParams(queryParams);
  }
};
export default DashboardComponent;
