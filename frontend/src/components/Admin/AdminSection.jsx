import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

function AdminTable({ data , handleUpdateSection }) {
  return (
    <Table className='container'>
      <TableHead>
        <TableRow>
          <TableCell>Image</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Section</TableCell>
          <TableCell>Actions</TableCell>
          <TableCell>Actions</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data && Array.isArray(data) && data.map((item) => ( 
          <TableRow key={item._id}>
            <TableCell style={{maxWidth : "200px"}}><img src = {item.imageUrl || ""} alt = {item.name}style={{ width : "10%"}}/></TableCell>
            <TableCell>{item.name}</TableCell> 
            <TableCell><p>Current Section: {item.section || "None"}</p></TableCell> 
            <TableCell>
              <Button onClick={() => handleUpdateSection("Most Popular" , item._id)}> Add to Most Popular</Button>
            </TableCell>
            <TableCell>
              <Button onClick={() => handleUpdateSection("Last Added" , item._id)}> Add to Last Added </Button>
            </TableCell>
            <TableCell>
              <Button onClick={() => handleUpdateSection("Best Offers" , item._id)}> Add to Best Offers </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default AdminTable;
