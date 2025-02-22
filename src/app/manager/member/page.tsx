"use client";

import useToastHandler from "@/lib/toastHanlder";
import { format } from 'date-fns';
import { useEffect, useState } from "react";
import { ConfirmDialog } from "@/components/manager/confirmDialog";
import LoadingAnimation from "@/components/manager/loadingAnimation";
import { OrderResponse, OrderStatus, UpdateOrderRequest } from "@/interfaces/order";
import OrderCard from "@/components/manager/orderCard";
import { useGetOrdersByStatus ,useUpdateOrder} from "@/api/manager/useOrder";
import { useGetTableById, useGetTables } from "@/api/manager/useTable";
import { BaseTableResponse } from "@/interfaces/table";
import DateTimeDisplay from "@/components/manager/clock";

import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import AddMemberDialog from "@/components/manager/addMemberDialog";
import { AddPointDialog } from "@/components/manager/addPointDialog";
import { UsePointDialog } from "@/components/manager/usePointDialog";
import toast, { Toaster } from "react-hot-toast";

// interface PreparingOrderWithTable extends OrderResponse {
//   table: BaseTableResponse;
// }

export default function MemberPage() {
  const [searchTerm, setSearchTerm] = useState("");
//   const toaster = useToastHandler();
//   const updateOrder = useUpdateOrder();
//   const [openDialog, setOpenDialog] = useState(false);
//   const { data: tables, isLoading: loadingTables, refetch: refetchTables } = useGetTables();
//   const {data: preparingOrders =[], isLoading: loadingPreparingOrders,refetch: refetchPreparingOrders } = useGetOrdersByStatus(OrderStatus.Preparing);
  
//   const [orderData, setOrderData] = useState<UpdateOrderRequest>();

  const initialData = [
    { phone: "064-293-xxxx", points: "1 / 10" },
    { phone: "064-293-xxxx", points: "1 / 10" },
    { phone: "064-293-xxxx", points: "1 / 10" },
    { phone: "064-293-xxxx", points: "1 / 10" },
    { phone: "064-293-xxxx", points: "1 / 10" },
  ];

  const [data, setData] = useState(initialData);
  
  const handleDelete = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  const [open, setOpen] = useState(false);
  const [ openDialog, setOpenDialog ] = useState(false);
  const [ openAddpointDialog, setopenAddpointDialog] = useState(false);
  const [ openUsePointDialog, setOpenUsePointDialog] = useState(false);

  const toaster = useToastHandler();

  const handleAddMemberSubmit = (phone: string, pin: string) => {
    setData([...data, { phone, points: "0 / 10" }]);
    toaster("เพิ่มสมาชิกสำเร็จ", "คุณได้ทำการเพิ่มสมาชิกเข้าในระบบ");
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-row justify-between">
        <label className="input input-bordered flex items-center gap-2 rounded-xl">
          <input type="text" className="grow" placeholder="Search Number" 
            value={searchTerm}  
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        <Button variant="destructive" onClick={() => setOpen(true)}>
            + เพิ่มสมาชิก
        </Button>

        <AddMemberDialog
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={handleAddMemberSubmit} 
        />
    </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>เบอร์โทรศัพท์</TableHead>
            <TableHead>แต้มสะสม</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.points}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => setOpenDialog(true)}>
                  Delete
                </Button>

                <ConfirmDialog
                    title="แน่ใจหรือไม่ว่าต้องการลบ?"
                    description="แน่ใจหรือไม่ว่าต้องการเบอร์นี้"
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    callback={async () => {    
                        handleDelete(index)
                        toaster("ลบสมาชิกสำเร็จ", "คุณได้ทำการลบสมาชิกในระบบเรียบร้อย");
                        }
                    }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

            <div className="btn btn-success w-5/12" onClick={() => {
                setOpenUsePointDialog(true);
                }}>
                  Use Point
            </div>
            <UsePointDialog
                openDialog={openUsePointDialog}
                setOpenDialog={setOpenUsePointDialog}
                callback={async () => {
                    toaster("ลูกค้าชำระเงินสำเร็จ", "ข้อมูลออเดอร์จะถูกจัดเก็บในประวัติออเดอร์");
                }}
            />
      
    </div>
  );
}
