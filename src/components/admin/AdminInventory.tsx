import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Package, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InventoryItem {
  id: number;
  product_name: string;
  category: string;
  current_stock: number;
  min_stock_level: number;
  max_stock_level: number;
  unit_cost: number;
  supplier: string;
  last_restocked: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

const AdminInventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [adjustmentQty, setAdjustmentQty] = useState("");
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'remove'>('add');
  const { toast } = useToast();

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      // Mock data for demonstration
      const mockInventory: InventoryItem[] = [
        {
          id: 1,
          product_name: "Chocolate Cake",
          category: "Cakes",
          current_stock: 15,
          min_stock_level: 5,
          max_stock_level: 50,
          unit_cost: 12.50,
          supplier: "Sweet Supplies Co.",
          last_restocked: "2024-01-10T10:00:00Z",
          status: "in_stock"
        },
        {
          id: 2,
          product_name: "Vanilla Cupcakes",
          category: "Cupcakes",
          current_stock: 8,
          min_stock_level: 10,
          max_stock_level: 100,
          unit_cost: 2.25,
          supplier: "Bakery Basics Ltd.",
          last_restocked: "2024-01-08T14:30:00Z",
          status: "low_stock"
        },
        {
          id: 3,
          product_name: "Strawberry Tart",
          category: "Tarts",
          current_stock: 0,
          min_stock_level: 3,
          max_stock_level: 25,
          unit_cost: 8.75,
          supplier: "Fresh Fruit Bakery",
          last_restocked: "2024-01-05T09:15:00Z",
          status: "out_of_stock"
        }
      ];
      setInventory(mockInventory);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStockAdjustment = async () => {
    if (!selectedItem || !adjustmentQty) return;

    const qty = parseInt(adjustmentQty);
    const newStock = adjustmentType === 'add' 
      ? selectedItem.current_stock + qty
      : Math.max(0, selectedItem.current_stock - qty);

    const newStatus: 'in_stock' | 'low_stock' | 'out_of_stock' = newStock <= 0 ? 'out_of_stock' 
      : newStock <= selectedItem.min_stock_level ? 'low_stock' 
      : 'in_stock';

    const updatedInventory = inventory.map(item =>
      item.id === selectedItem.id
        ? { ...item, current_stock: newStock, status: newStatus }
        : item
    );

    setInventory(updatedInventory);
    setIsDialogOpen(false);
    setAdjustmentQty("");
    setSelectedItem(null);

    toast({
      title: "Stock Updated",
      description: `${selectedItem.product_name} stock ${adjustmentType === 'add' ? 'increased' : 'decreased'} by ${qty}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'default';
      case 'low_stock': return 'secondary';
      case 'out_of_stock': return 'destructive';
      default: return 'default';
    }
  };

  const lowStockItems = inventory.filter(item => item.status === 'low_stock' || item.status === 'out_of_stock');

  if (loading) {
    return <div className="flex justify-center p-8">Loading inventory...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Inventory Management</h2>
          <p className="text-gray-600">Monitor and manage stock levels</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {inventory.filter(item => item.status === 'in_stock').length}
            </div>
            <div className="text-sm text-gray-600">Items In Stock</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {inventory.filter(item => item.status === 'low_stock').length}
            </div>
            <div className="text-sm text-gray-600">Low Stock Items</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {inventory.filter(item => item.status === 'out_of_stock').length}
            </div>
            <div className="text-sm text-gray-600">Out of Stock</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              ${inventory.reduce((sum, item) => sum + (item.current_stock * item.unit_cost), 0).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Total Inventory Value</div>
          </CardContent>
        </Card>
      </div>

      {lowStockItems.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockItems.map(item => (
                <div key={item.id} className="flex items-center justify-between p-2 bg-white rounded">
                  <span className="font-medium">{item.product_name}</span>
                  <Badge variant={getStatusColor(item.status)}>
                    {item.current_stock} remaining
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Inventory Overview</CardTitle>
          <CardDescription>
            Current stock levels and product information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Min/Max Levels</TableHead>
                <TableHead>Unit Cost</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.product_name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.current_stock}</TableCell>
                  <TableCell>{item.min_stock_level} / {item.max_stock_level}</TableCell>
                  <TableCell>${item.unit_cost}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(item.status)}>
                      {item.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog open={isDialogOpen && selectedItem?.id === item.id} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedItem(item)}
                        >
                          <Package className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Adjust Stock - {item.product_name}</DialogTitle>
                          <DialogDescription>
                            Current stock: {item.current_stock} units
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex space-x-2">
                            <Button
                              variant={adjustmentType === 'add' ? 'default' : 'outline'}
                              onClick={() => setAdjustmentType('add')}
                              className="flex-1"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Stock
                            </Button>
                            <Button
                              variant={adjustmentType === 'remove' ? 'default' : 'outline'}
                              onClick={() => setAdjustmentType('remove')}
                              className="flex-1"
                            >
                              <Minus className="w-4 h-4 mr-2" />
                              Remove Stock
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input
                              id="quantity"
                              type="number"
                              value={adjustmentQty}
                              onChange={(e) => setAdjustmentQty(e.target.value)}
                              placeholder="Enter quantity"
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleStockAdjustment}>
                              Update Stock
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminInventory;
