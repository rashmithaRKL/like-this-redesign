
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Truck, MapPin, Clock, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Shipment {
  id: number;
  order_id: number;
  tracking_number: string;
  customer_name: string;
  shipping_address: string;
  carrier: string;
  status: 'preparing' | 'shipped' | 'in_transit' | 'delivered' | 'exception';
  estimated_delivery: string;
  actual_delivery?: string;
  created_at: string;
  tracking_events: TrackingEvent[];
}

interface TrackingEvent {
  timestamp: string;
  status: string;
  location: string;
  description: string;
}

const AdminTracking = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [newTrackingNumber, setNewTrackingNumber] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      // Mock data for demonstration
      const mockShipments: Shipment[] = [
        {
          id: 1,
          order_id: 1001,
          tracking_number: "TRK123456789",
          customer_name: "John Doe",
          shipping_address: "123 Main St, City, State 12345",
          carrier: "FedEx",
          status: "in_transit",
          estimated_delivery: "2024-01-20T18:00:00Z",
          created_at: "2024-01-15T10:30:00Z",
          tracking_events: [
            {
              timestamp: "2024-01-15T10:30:00Z",
              status: "Label Created",
              location: "Origin Facility",
              description: "Shipping label created"
            },
            {
              timestamp: "2024-01-16T14:20:00Z",
              status: "Picked Up",
              location: "Bakery Location",
              description: "Package picked up by carrier"
            },
            {
              timestamp: "2024-01-17T09:15:00Z",
              status: "In Transit",
              location: "Distribution Center",
              description: "Package is in transit"
            }
          ]
        },
        {
          id: 2,
          order_id: 1002,
          tracking_number: "TRK987654321",
          customer_name: "Jane Smith",
          shipping_address: "456 Oak Ave, City, State 67890",
          carrier: "UPS",
          status: "preparing",
          estimated_delivery: "2024-01-22T18:00:00Z",
          created_at: "2024-01-18T15:45:00Z",
          tracking_events: [
            {
              timestamp: "2024-01-18T15:45:00Z",
              status: "Order Received",
              location: "Bakery",
              description: "Order is being prepared"
            }
          ]
        }
      ];
      setShipments(mockShipments);
    } catch (error) {
      console.error('Error fetching shipments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTrackingNumber = async (shipmentId: number, trackingNumber: string) => {
    const updatedShipments = shipments.map(shipment =>
      shipment.id === shipmentId
        ? { ...shipment, tracking_number: trackingNumber }
        : shipment
    );
    setShipments(updatedShipments);
    setIsDialogOpen(false);
    setNewTrackingNumber("");
    
    toast({
      title: "Tracking Updated",
      description: "Tracking number has been updated successfully",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'secondary';
      case 'shipped': return 'default';
      case 'in_transit': return 'outline';
      case 'delivered': return 'default';
      case 'exception': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'preparing': return Package;
      case 'shipped': return Truck;
      case 'in_transit': return MapPin;
      case 'delivered': return Package;
      default: return Clock;
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading shipments...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Shipment Tracking</h2>
          <p className="text-gray-600">Monitor and track all shipments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {shipments.filter(s => s.status === 'preparing').length}
            </div>
            <div className="text-sm text-gray-600">Preparing</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {shipments.filter(s => s.status === 'shipped').length}
            </div>
            <div className="text-sm text-gray-600">Shipped</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {shipments.filter(s => s.status === 'in_transit').length}
            </div>
            <div className="text-sm text-gray-600">In Transit</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {shipments.filter(s => s.status === 'delivered').length}
            </div>
            <div className="text-sm text-gray-600">Delivered</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {shipments.filter(s => s.status === 'exception').length}
            </div>
            <div className="text-sm text-gray-600">Exceptions</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Shipments</CardTitle>
          <CardDescription>
            Track and manage all shipments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Tracking Number</TableHead>
                <TableHead>Carrier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Est. Delivery</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => {
                const StatusIcon = getStatusIcon(shipment.status);
                return (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">#{shipment.order_id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{shipment.customer_name}</div>
                        <div className="text-sm text-gray-600 max-w-xs truncate">
                          {shipment.shipping_address}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{shipment.tracking_number}</TableCell>
                    <TableCell>{shipment.carrier}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(shipment.status)} className="flex items-center w-fit">
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {shipment.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(shipment.estimated_delivery).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Shipment Details - Order #{shipment.order_id}</DialogTitle>
                              <DialogDescription>
                                Tracking Number: {shipment.tracking_number}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Customer</Label>
                                  <p className="text-sm">{shipment.customer_name}</p>
                                </div>
                                <div>
                                  <Label>Carrier</Label>
                                  <p className="text-sm">{shipment.carrier}</p>
                                </div>
                              </div>
                              <div>
                                <Label>Shipping Address</Label>
                                <p className="text-sm">{shipment.shipping_address}</p>
                              </div>
                              <div>
                                <Label>Tracking Events</Label>
                                <div className="space-y-2 mt-2">
                                  {shipment.tracking_events.map((event, index) => (
                                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded">
                                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                      <div>
                                        <div className="font-medium">{event.status}</div>
                                        <div className="text-sm text-gray-600">{event.location}</div>
                                        <div className="text-sm text-gray-500">{event.description}</div>
                                        <div className="text-xs text-gray-400">
                                          {new Date(event.timestamp).toLocaleString()}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Dialog open={isDialogOpen && selectedShipment?.id === shipment.id} onOpenChange={setIsDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedShipment(shipment);
                                setNewTrackingNumber(shipment.tracking_number);
                              }}
                            >
                              Update
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Update Tracking Number</DialogTitle>
                              <DialogDescription>
                                Order #{shipment.order_id} - {shipment.customer_name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="tracking">Tracking Number</Label>
                                <Input
                                  id="tracking"
                                  value={newTrackingNumber}
                                  onChange={(e) => setNewTrackingNumber(e.target.value)}
                                  placeholder="Enter tracking number"
                                />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={() => updateTrackingNumber(shipment.id, newTrackingNumber)}>
                                  Update
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTracking;
