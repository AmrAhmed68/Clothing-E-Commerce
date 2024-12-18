import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

function AdminTable({ data, onDelete , onEdit }) {
  return (
    <Table className='container'>
      <TableHead>
        <TableRow>
          <TableCell>Image</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>stock</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Actions</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item._id}>
            <TableCell style={{maxWidth : "200px"}}><img src = {item.imageUrl} alt = {item.name}style={{ width : "10%"}}/></TableCell>
            <TableCell>{item.name}</TableCell> 
            <TableCell>{item.stock}</TableCell>
            <TableCell>${item.price}</TableCell>
            <TableCell>
              <Button onClick={() => onDelete(item._id)}>Delete</Button>
            </TableCell>
            <TableCell>
              <Button onClick={() => onEdit(item)}>Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default AdminTable;
