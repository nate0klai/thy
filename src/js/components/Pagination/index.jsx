import React, {useState, useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';

import "./styles.scss";

import {
  Box,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from '@material-ui/core';
import { StarBorder as StarBorderIcon } from '@material-ui/icons';

import clsx from 'clsx';

const headCells = [
  { id: 'name', align: 'left', label: 'Name' },
  { id: 'stars', align: 'right', mod: '_stars', label: 'Stars' }
];

const preparedList = (list, page, nameOrderDesc) => {
  return list.sort((a, b) => {
    if (a.name > b.name) {
      return nameOrderDesc ? 1 : -1;
    }
    if (a.name < b.name) {
      return nameOrderDesc ? -1 : 1;
    }
    return 0;
  }).slice(page* 3, (page + 1) * 3)
};

const onRowClick = url => () => window.open(url);

const emptyFn = () => null;

function Pagination({count, list}) {
  const [page, setPage] = useState(0);
  const [nameOrderDesc, changeNameOrderDeac] = useState(true);
  const [modalInfoShown, toggleModalInfo] = useState(false);

  const onChangePage = useCallback((event, value) => setPage(value), []);
  const onColumnNameLabelClick = useCallback(() => count === list.length ? changeNameOrderDeac(!nameOrderDesc) : toggleModalInfo(true), [count, list, nameOrderDesc]);
  const handleModalClose = useCallback(() => toggleModalInfo(false), []);
  const labelDisplayedRowsHandler = useCallback(({ from }) => 'page ' + Math.ceil(from / 3) + ' from ' + Math.ceil(count/3), [count]);
  const nameOrderValue = useMemo(() => nameOrderDesc ? 'desc' : 'asc', [nameOrderDesc]);

  return (
    <Box className="pagination">
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          size="small"
          aria-label="enhanced table"
        >
          <TableHead>
            <TableRow>
              {headCells.map(({id, label, align, mod}, i) => (
                <TableCell
                  key={'tableHeadCell' + i}
                  align={align}
                >
                  <TableSortLabel
                    className={clsx('pagination__head-cell', {[mod]: mod})}
                    active
                    direction={id === 'name' ? nameOrderValue : 'desc'}
                    onClick={id === 'name' ? onColumnNameLabelClick : emptyFn}
                  >
                    {label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {preparedList(list, page, nameOrderDesc)
            .map(({name, stars, url}) => {
              return (
                <TableRow
                  className="pagination-row"
                  hover
                  onClick={onRowClick(url)}
                  tabIndex={-1}
                  key={name}
                >
                  <TableCell component="th" scope="row" padding="none" className="pagination__cell _name">
                    {name}
                  </TableCell>
                  <TableCell align="right" className="pagination__cell">
                    <Box component="span" className="pagination-cell">
                      <Box component="span">{stars}</Box>
                      <StarBorderIcon className="pagination-cell__star-icon"/>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={count}
        rowsPerPage={3}
        page={page}
        labelRowsPerPage=""
        onChangePage={onChangePage}
        labelDisplayedRows={labelDisplayedRowsHandler}
      />
      <Modal
        open={modalInfoShown}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className="modal modal-info" p={2}>
          <Box className="modal-info__text">please wait until the whole list will be loaded</Box>
        </Box>
      </Modal>
    </Box>
  );
}

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    stars: PropTypes.number
  })).isRequired
};

export default Pagination;