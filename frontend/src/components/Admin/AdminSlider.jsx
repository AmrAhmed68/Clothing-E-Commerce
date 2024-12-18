import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

function AdminTable({ data, onDelete }) {
  return (
      <>
    <h1>SLider Photo</h1>
    <Table className='container'>
      <TableHead>
        <TableRow>
          <TableCell>Image</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item._id}>
            <TableCell style={{maxWidth : "200px"}}><img src = {item.image || ""} alt = "" style={{ width : "10%"}}/></TableCell>
            <TableCell>
              <Button onClick={() => onDelete(item._id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
        </>
  );
}

export default AdminTable;
