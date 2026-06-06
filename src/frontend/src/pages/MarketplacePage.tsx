import { ModuleLayout } from "@/components/ModuleLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import {
  useActiveListings,
  useAddListing,
  useCreateOrder,
  useDeleteListing,
  useMyBuyerOrders,
  useMyListings,
  useMySellerOrders,
  useMySellerStats,
  useUpdateListing,
  useUpdateOrderStatus,
} from "@/hooks/useBackend";
import type { Listing, Order } from "@/hooks/useBackend";
import type { AppRoute, ProductCategory } from "@/types/index";
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle,
  Edit2,
  Minus,
  Package,
  PackageOpen,
  Plus,
  Search,
  ShoppingBag,
  ShoppingCart,
  Star,
  Store,
  Tag,
  Trash2,
  TrendingUp,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  onNavigateHome: () => void;
  onNavigate: (route: AppRoute) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TC = "oklch(0.52_0.18_35)";
const TC_LIGHT = "oklch(0.78_0.14_35)";

const categoryEmojis: Record<string, string> = {
  craft: "🏺",
  textile: "🧵",
  art: "🎨",
  jewelry: "💎",
  instrument: "🎸",
  book: "📚",
  artisanProduct: "✨",
};

const categoryGradients: Record<string, string> = {
  craft: "from-[oklch(0.52_0.18_35/0.25)] to-[oklch(0.60_0.14_40/0.15)]",
  textile: "from-[oklch(0.50_0.20_270/0.25)] to-[oklch(0.58_0.16_265/0.15)]",
  art: "from-[oklch(0.62_0.20_25/0.25)] to-[oklch(0.70_0.16_20/0.15)]",
  jewelry: "from-[oklch(0.68_0.22_86/0.25)] to-[oklch(0.76_0.18_80/0.15)]",
  instrument: "from-[oklch(0.45_0.25_295/0.25)] to-[oklch(0.55_0.18_280/0.15)]",
  book: "from-[oklch(0.65_0.15_200/0.25)] to-[oklch(0.72_0.12_195/0.15)]",
  artisanProduct:
    "from-[oklch(0.75_0.18_65/0.25)] to-[oklch(0.82_0.14_60/0.15)]",
};

const CATEGORIES: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "craft", label: "Pottery & Crafts" },
  { id: "textile", label: "Textiles" },
  { id: "art", label: "Paintings & Art" },
  { id: "jewelry", label: "Jewelry" },
  { id: "instrument", label: "Instruments" },
  { id: "book", label: "Books" },
  { id: "artisanProduct", label: "Artisan Goods" },
];

const LISTING_CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: "craft", label: "Pottery & Crafts" },
  { id: "textile", label: "Textiles" },
  { id: "art", label: "Paintings & Art" },
  { id: "jewelry", label: "Jewelry" },
  { id: "instrument", label: "Instruments" },
  { id: "book", label: "Books" },
  { id: "artisanProduct", label: "Artisan Goods" },
];

const ORDER_STATUSES: Record<string, { label: string; color: string }> = {
  pending: {
    label: "Pending",
    color: "bg-[oklch(0.72_0.2_80/0.15)] text-[oklch(0.68_0.18_80)]",
  },
  paid: {
    label: "Paid",
    color: "bg-[oklch(0.65_0.15_200/0.15)] text-[oklch(0.65_0.15_200)]",
  },
  shipped: {
    label: "Shipped",
    color: "bg-[oklch(0.45_0.25_295/0.15)] text-[oklch(0.65_0.18_295)]",
  },
  delivered: {
    label: "Delivered",
    color: "bg-[oklch(0.55_0.18_140/0.15)] text-[oklch(0.55_0.18_140)]",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-[oklch(0.55_0.22_25/0.15)] text-[oklch(0.62_0.20_25)]",
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface CartItem {
  listing: Listing;
  quantity: number;
}

interface ShippingForm {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

type CheckoutStep = "shipping" | "payment" | "review" | "success";
type PaymentMethod = "card" | "upi" | "cod";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(paise: bigint) {
  const amount = Number(paise) / 100;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}k`;
  return `₹${amount.toLocaleString()}`;
}

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  listing,
  index,
  onAddToCart,
  isAuthenticated,
  onNavigate,
}: {
  listing: Listing;
  index: number;
  onAddToCart: (l: Listing) => void;
  isAuthenticated: boolean;
  onNavigate: (route: AppRoute) => void;
}) {
  const cat = listing.category as unknown as string;
  const gradient = categoryGradients[cat] ?? categoryGradients.craft;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      data-ocid={`marketplace.item.${index + 1}`}
      className="glass border border-border/40 rounded-2xl overflow-hidden card-hover group flex flex-col"
    >
      {/* Product image area */}
      <div
        className={`bg-gradient-to-br ${gradient} p-8 flex items-center justify-center relative overflow-hidden min-h-[140px]`}
      >
        <span className="text-6xl drop-shadow-sm">
          {categoryEmojis[cat] ?? "🛍️"}
        </span>
        <div className="absolute top-3 right-3">
          <Badge className="text-[10px] border-0 bg-card/80 backdrop-blur-sm text-muted-foreground">
            {Number(listing.stock)} left
          </Badge>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <Badge
          className="text-[10px] w-fit border-0"
          style={{ background: "oklch(0.52 0.18 35 / 0.12)", color: TC_LIGHT }}
        >
          {listing.region}
        </Badge>

        <h3 className="font-semibold text-sm text-foreground leading-tight group-hover:text-[oklch(0.60_0.12_35)] transition-colors line-clamp-2">
          {listing.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed flex-1">
          {listing.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/30">
          <div className="font-bold text-foreground text-base">
            {formatPrice(listing.price)}
          </div>
          <Button
            size="sm"
            data-ocid={`marketplace.add_to_cart_button.${index + 1}`}
            onClick={() => {
              if (!isAuthenticated) {
                onNavigate("signup");
                return;
              }
              onAddToCart(listing);
            }}
            className="text-xs gap-1.5 border-0 btn-ripple"
            style={{ background: TC, color: "oklch(0.97 0.005 240)" }}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Cart Panel ───────────────────────────────────────────────────────────────

function CartPanel({
  cart,
  onClose,
  onUpdateQty,
  onRemove,
  onCheckout,
}: {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQty: (id: bigint, delta: number) => void;
  onRemove: (id: bigint) => void;
  onCheckout: () => void;
}) {
  const subtotal = cart.reduce(
    (s, i) => s + (Number(i.listing.price) * i.quantity) / 100,
    0,
  );
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <motion.div
      key="cart"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-card shadow-premium z-50 flex flex-col border-l border-border"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-5 h-5" style={{ color: TC_LIGHT }} />
          <h2 className="font-semibold text-foreground">
            Cart ({cart.length})
          </h2>
        </div>
        <button
          type="button"
          data-ocid="marketplace.cart.close_button"
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
        {cart.length === 0 ? (
          <div
            data-ocid="marketplace.cart.empty_state"
            className="flex flex-col items-center gap-3 py-16 text-center"
          >
            <ShoppingBag className="w-12 h-12 text-muted-foreground opacity-30" />
            <p className="text-muted-foreground text-sm">Your cart is empty</p>
          </div>
        ) : (
          cart.map((item, i) => (
            <div
              key={String(item.listing.id)}
              data-ocid={`marketplace.cart.item.${i + 1}`}
              className="flex items-start gap-3 p-3 glass rounded-xl border border-border/40"
            >
              <div
                className={`w-12 h-12 rounded-lg flex-shrink-0 bg-gradient-to-br ${categoryGradients[item.listing.category as unknown as string] ?? ""} flex items-center justify-center text-xl`}
              >
                {categoryEmojis[item.listing.category as unknown as string] ??
                  "🛍️"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground line-clamp-1">
                  {item.listing.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatPrice(item.listing.price)}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <button
                    type="button"
                    data-ocid={`marketplace.cart.qty_minus.${i + 1}`}
                    onClick={() => onUpdateQty(item.listing.id, -1)}
                    className="w-6 h-6 rounded-md border border-border/60 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-medium w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    data-ocid={`marketplace.cart.qty_plus.${i + 1}`}
                    onClick={() => onUpdateQty(item.listing.id, 1)}
                    disabled={item.quantity >= Number(item.listing.stock)}
                    className="w-6 h-6 rounded-md border border-border/60 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs font-bold text-foreground">
                  {formatPrice(
                    BigInt(
                      Math.round(Number(item.listing.price) * item.quantity),
                    ),
                  )}
                </span>
                <button
                  type="button"
                  data-ocid={`marketplace.cart.remove_button.${i + 1}`}
                  onClick={() => onRemove(item.listing.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {cart.length > 0 && (
        <div className="px-6 py-5 border-t border-border bg-card">
          <div className="flex flex-col gap-1.5 mb-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-[oklch(0.55_0.18_140)]">Free</span>
                ) : (
                  `₹${shipping}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-foreground border-t border-border pt-2 mt-1">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
          {subtotal < 500 && (
            <p className="text-[10px] text-muted-foreground mb-3">
              Add ₹{(500 - subtotal).toFixed(0)} more for free shipping
            </p>
          )}
          <Button
            data-ocid="marketplace.cart.checkout_button"
            className="w-full gap-2 border-0 btn-ripple"
            style={{ background: TC, color: "oklch(0.97 0.005 240)" }}
            onClick={onCheckout}
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </motion.div>
  );
}

// ─── Checkout Modal ───────────────────────────────────────────────────────────

function CheckoutModal({
  cart,
  onClose,
  onOrderPlaced,
}: {
  cart: CartItem[];
  onClose: () => void;
  onOrderPlaced: (orderId: bigint) => void;
}) {
  const [step, setStep] = useState<CheckoutStep>("shipping");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const createOrder = useCreateOrder();
  const [form, setForm] = useState<ShippingForm>({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<ShippingForm>>({});

  const subtotal = cart.reduce(
    (s, i) => s + (Number(i.listing.price) * i.quantity) / 100,
    0,
  );
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const steps: CheckoutStep[] = ["shipping", "payment", "review", "success"];
  const stepIdx = steps.indexOf(step);

  function validateShipping(): boolean {
    const e: Partial<ShippingForm> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state.trim()) e.state = "State is required";
    if (!/^\d{6}$/.test(form.pincode))
      e.pincode = "Valid 6-digit pincode required";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Valid 10-digit phone required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handlePlaceOrder() {
    const addr = `${form.name}, ${form.address}, ${form.city}, ${form.state} - ${form.pincode}, Ph: ${form.phone}`;
    try {
      // Place one order per cart item (backend handles per-listing orders)
      let lastOrder: Order | null = null;
      for (const item of cart) {
        const o = await createOrder.mutateAsync({
          listingId: item.listing.id,
          sellerId: item.listing.sellerId,
          quantity: BigInt(item.quantity),
          totalPrice: BigInt(
            Math.round(Number(item.listing.price) * item.quantity),
          ),
          stripeSessionId: `demo_${Date.now()}`,
          shippingAddress: addr,
        });
        lastOrder = o;
      }
      if (lastOrder) {
        setStep("success");
        onOrderPlaced(lastOrder.id);
      }
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 bg-[oklch(0.05_0.05_260/0.7)] backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        data-ocid="marketplace.checkout.dialog"
        className="bg-card rounded-t-3xl sm:rounded-2xl shadow-premium w-full sm:max-w-lg max-h-[92vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-semibold text-foreground">
            {step === "success" ? "🎉 Order Placed!" : "Checkout"}
          </h2>
          {step !== "success" && (
            <button
              type="button"
              data-ocid="marketplace.checkout.close_button"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Progress indicator */}
        {step !== "success" && (
          <div className="flex items-center px-6 pt-4 gap-1">
            {(["shipping", "payment", "review"] as CheckoutStep[]).map(
              (s, i) => (
                <div key={s} className="flex items-center gap-1 flex-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      stepIdx > i
                        ? "bg-[oklch(0.55_0.18_140)] text-[oklch(0.97_0.005_240)]"
                        : stepIdx === i
                          ? "border-2 text-[oklch(0.60_0.12_35)]"
                          : "bg-muted text-muted-foreground"
                    }`}
                    style={
                      stepIdx === i
                        ? { borderColor: TC_LIGHT, color: TC_LIGHT }
                        : {}
                    }
                  >
                    {stepIdx > i ? <Check className="w-3.5 h-3.5" /> : i + 1}
                  </div>
                  <span
                    className={`text-[10px] font-medium hidden sm:block ${stepIdx === i ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </span>
                  {i < 2 && (
                    <div
                      className={`flex-1 h-0.5 mx-1 rounded ${stepIdx > i ? "bg-[oklch(0.55_0.18_140)]" : "bg-border"}`}
                    />
                  )}
                </div>
              ),
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === "shipping" && (
            <div className="flex flex-col gap-4">
              <h3 className="font-medium text-foreground text-sm">
                Shipping Address
              </h3>
              {(
                [
                  "name",
                  "address",
                  "city",
                  "state",
                  "pincode",
                  "phone",
                ] as (keyof ShippingForm)[]
              ).map((field) => (
                <div key={field}>
                  <Label className="text-xs capitalize mb-1 block">
                    {field}
                  </Label>
                  <Input
                    data-ocid={`marketplace.checkout.${field}_input`}
                    value={form[field]}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, [field]: e.target.value }));
                      setErrors((p) => ({ ...p, [field]: undefined }));
                    }}
                    placeholder={
                      field === "pincode"
                        ? "6-digit pincode"
                        : field === "phone"
                          ? "10-digit phone"
                          : `Enter ${field}`
                    }
                    className={errors[field] ? "border-destructive" : ""}
                  />
                  {errors[field] && (
                    <p className="text-destructive text-[10px] mt-0.5">
                      {errors[field]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {step === "payment" && (
            <div className="flex flex-col gap-3">
              <h3 className="font-medium text-foreground text-sm mb-1">
                Payment Method
              </h3>
              {(
                [
                  {
                    id: "card",
                    label: "💳 Pay with Card",
                    desc: "Visa, Mastercard, RuPay",
                  },
                  {
                    id: "upi",
                    label: "📱 Pay with UPI",
                    desc: "GPay, PhonePe, Paytm",
                  },
                  {
                    id: "cod",
                    label: "💵 Cash on Delivery",
                    desc: "Pay when delivered",
                  },
                ] as { id: PaymentMethod; label: string; desc: string }[]
              ).map((pm) => (
                <button
                  key={pm.id}
                  type="button"
                  data-ocid={`marketplace.checkout.payment_${pm.id}`}
                  onClick={() => setPaymentMethod(pm.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                    paymentMethod === pm.id
                      ? "border-[oklch(0.52_0.18_35)] bg-[oklch(0.52_0.18_35/0.06)]"
                      : "border-border hover:border-border/80"
                  }`}
                >
                  <span className="text-2xl">{pm.label.split(" ")[0]}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {pm.label.slice(3)}
                    </p>
                    <p className="text-xs text-muted-foreground">{pm.desc}</p>
                  </div>
                  {paymentMethod === pm.id && (
                    <CheckCircle
                      className="ml-auto w-5 h-5 flex-shrink-0"
                      style={{ color: TC_LIGHT }}
                    />
                  )}
                </button>
              ))}
              <div className="glass border border-[oklch(0.52_0.18_35/0.2)] rounded-xl p-3 mt-1 flex items-start gap-2">
                <AlertCircle
                  className="w-4 h-4 flex-shrink-0 mt-0.5"
                  style={{ color: TC_LIGHT }}
                />
                <p className="text-xs text-muted-foreground">
                  This is a demo platform. No real charges will be made.
                </p>
              </div>
            </div>
          )}

          {step === "review" && (
            <div className="flex flex-col gap-4">
              <h3 className="font-medium text-foreground text-sm">
                Order Review
              </h3>
              {cart.map((item) => (
                <div
                  key={String(item.listing.id)}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="text-xl">
                    {categoryEmojis[
                      item.listing.category as unknown as string
                    ] ?? "🛍️"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-xs line-clamp-1">
                      {item.listing.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-bold">
                    {formatPrice(
                      BigInt(
                        Math.round(Number(item.listing.price) * item.quantity),
                      ),
                    )}
                  </span>
                </div>
              ))}
              <div className="border-t border-border pt-3 flex flex-col gap-1.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-foreground text-sm pt-1 border-t border-border mt-1">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              <div className="glass rounded-xl p-3 border border-border/40 text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Shipping to:</p>
                <p>{form.name}</p>
                <p>
                  {form.address}, {form.city}, {form.state} - {form.pincode}
                </p>
                <p>📱 {form.phone}</p>
                <p className="mt-1 font-medium" style={{ color: TC_LIGHT }}>
                  {paymentMethod === "card"
                    ? "💳 Card Payment"
                    : paymentMethod === "upi"
                      ? "📱 UPI Payment"
                      : "💵 Cash on Delivery"}
                </p>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center gap-5 py-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-[oklch(0.55_0.18_140/0.15)] border-2 border-[oklch(0.55_0.18_140/0.4)] flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-[oklch(0.55_0.18_140)]" />
              </motion.div>
              <div>
                <h3 className="font-display text-2xl text-foreground mb-2">
                  Order Confirmed!
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your heritage treasures are on their way. Thank you for
                  supporting artisans!
                </p>
              </div>
              <div className="w-full glass rounded-xl p-4 border border-border/40">
                <p className="text-xs text-muted-foreground mb-1">
                  Estimated delivery
                </p>
                <p className="font-semibold text-foreground">
                  5–7 business days
                </p>
              </div>
              <Button
                data-ocid="marketplace.checkout.success_close_button"
                className="w-full border-0"
                style={{ background: TC, color: "oklch(0.97 0.005 240)" }}
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {step !== "success" && (
          <div className="px-6 py-4 border-t border-border flex gap-3">
            {step !== "shipping" && (
              <Button
                variant="outline"
                data-ocid="marketplace.checkout.back_button"
                onClick={() => setStep(steps[stepIdx - 1] as CheckoutStep)}
                className="flex-1"
              >
                Back
              </Button>
            )}
            {step !== "review" ? (
              <Button
                data-ocid="marketplace.checkout.next_button"
                className="flex-1 border-0 btn-ripple"
                style={{ background: TC, color: "oklch(0.97 0.005 240)" }}
                onClick={() => {
                  if (step === "shipping" && !validateShipping()) return;
                  setStep(steps[stepIdx + 1] as CheckoutStep);
                }}
              >
                Continue <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                data-ocid="marketplace.checkout.place_order_button"
                className="flex-1 border-0 btn-ripple"
                style={{ background: TC, color: "oklch(0.97 0.005 240)" }}
                onClick={handlePlaceOrder}
                disabled={createOrder.isPending}
              >
                {createOrder.isPending ? "Placing…" : "Place Order 🎉"}
              </Button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ─── Add Listing Form ─────────────────────────────────────────────────────────

function AddListingForm({ onClose }: { onClose: () => void }) {
  const addListing = useAddListing();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    region: "",
    tags: "",
    category: "craft" as ProductCategory,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.price || !form.stock) {
      toast.error("Fill in all required fields");
      return;
    }
    try {
      await addListing.mutateAsync({
        title: form.title,
        description: form.description,
        price: BigInt(Math.round(Number.parseFloat(form.price) * 100)),
        category: form.category,
        imageUrls: [],
        stock: BigInt(Number.parseInt(form.stock)),
        region: form.region,
      });
      toast.success("Listing created! 🎉");
      onClose();
    } catch {
      toast.error("Failed to create listing");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Label className="text-xs mb-1 block">Product Title *</Label>
          <Input
            data-ocid="marketplace.add_listing.title_input"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="e.g. Hand-Painted Madhubani Panel"
          />
        </div>
        <div className="sm:col-span-2">
          <Label className="text-xs mb-1 block">Description</Label>
          <textarea
            data-ocid="marketplace.add_listing.description_input"
            value={form.description}
            onChange={(e) =>
              setForm((p) => ({ ...p, description: e.target.value }))
            }
            placeholder="Describe your authentic craft..."
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <Label className="text-xs mb-1 block">Price (₹) *</Label>
          <Input
            data-ocid="marketplace.add_listing.price_input"
            type="number"
            min="1"
            value={form.price}
            onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
            placeholder="e.g. 499"
          />
        </div>
        <div>
          <Label className="text-xs mb-1 block">Stock *</Label>
          <Input
            data-ocid="marketplace.add_listing.stock_input"
            type="number"
            min="1"
            value={form.stock}
            onChange={(e) => setForm((p) => ({ ...p, stock: e.target.value }))}
            placeholder="e.g. 5"
          />
        </div>
        <div>
          <Label className="text-xs mb-1 block">Category</Label>
          <select
            data-ocid="marketplace.add_listing.category_select"
            value={form.category}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                category: e.target.value as ProductCategory,
              }))
            }
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {LISTING_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label className="text-xs mb-1 block">Region / Origin</Label>
          <Input
            data-ocid="marketplace.add_listing.region_input"
            value={form.region}
            onChange={(e) => setForm((p) => ({ ...p, region: e.target.value }))}
            placeholder="e.g. Bihar, India"
          />
        </div>
        <div className="sm:col-span-2">
          <Label className="text-xs mb-1 block">Image Upload</Label>
          <div
            data-ocid="marketplace.add_listing.upload_button"
            className="border-2 border-dashed border-border/60 rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-[oklch(0.52_0.18_35/0.5)] transition-colors"
          >
            <Upload className="w-8 h-8 text-muted-foreground opacity-50" />
            <p className="text-xs text-muted-foreground text-center">
              Click to upload product images
              <br />
              <span className="text-[10px]">
                JPG, PNG up to 5MB (object-storage backed)
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          data-ocid="marketplace.add_listing.cancel_button"
          onClick={onClose}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          data-ocid="marketplace.add_listing.submit_button"
          disabled={addListing.isPending}
          className="flex-1 border-0"
          style={{ background: TC, color: "oklch(0.97 0.005 240)" }}
        >
          {addListing.isPending ? "Creating…" : "Create Listing"}
        </Button>
      </div>
    </form>
  );
}

// ─── Edit Listing Row ─────────────────────────────────────────────────────────

function EditListingRow({
  listing,
  onDone,
}: {
  listing: Listing;
  onDone: () => void;
}) {
  const updateListing = useUpdateListing();
  const [form, setForm] = useState({
    title: listing.title,
    description: listing.description,
    price: String(Number(listing.price) / 100),
    stock: String(listing.stock),
    isActive: listing.isActive,
  });

  async function handleSave() {
    try {
      await updateListing.mutateAsync({
        id: listing.id,
        title: form.title,
        description: form.description,
        price: BigInt(Math.round(Number.parseFloat(form.price) * 100)),
        stock: BigInt(Number.parseInt(form.stock)),
        isActive: form.isActive,
      });
      toast.success("Listing updated");
      onDone();
    } catch {
      toast.error("Update failed");
    }
  }

  return (
    <div className="bg-muted/30 rounded-xl p-4 flex flex-col gap-3">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="col-span-2">
          <Label className="text-[10px] mb-0.5 block">Title</Label>
          <Input
            className="h-8 text-xs"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          />
        </div>
        <div>
          <Label className="text-[10px] mb-0.5 block">Price (₹)</Label>
          <Input
            className="h-8 text-xs"
            type="number"
            value={form.price}
            onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
          />
        </div>
        <div>
          <Label className="text-[10px] mb-0.5 block">Stock</Label>
          <Input
            className="h-8 text-xs"
            type="number"
            value={form.stock}
            onChange={(e) => setForm((p) => ({ ...p, stock: e.target.value }))}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs cursor-pointer">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) =>
              setForm((p) => ({ ...p, isActive: e.target.checked }))
            }
            className="rounded"
          />
          Active listing
        </label>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onDone}
            className="h-7 text-xs"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            data-ocid="marketplace.edit_listing.save_button"
            disabled={updateListing.isPending}
            onClick={handleSave}
            className="h-7 text-xs border-0"
            style={{ background: TC, color: "oklch(0.97 0.005 240)" }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MarketplacePage({ onNavigateHome, onNavigate }: Props) {
  const { isAuthenticated, login } = useAuth();
  const { data: listings, isLoading } = useActiveListings();
  const { data: myListings } = useMyListings();
  const { data: sellerStats } = useMySellerStats();
  const { data: buyerOrders } = useMyBuyerOrders();
  const { data: sellerOrders } = useMySellerOrders();
  const deleteListing = useDeleteListing();
  const updateOrderStatus = useUpdateOrderStatus();

  const [view, setView] = useState<"browse" | "sell" | "orders">("browse");
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">(
    "all",
  );
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [_lastOrderId, setLastOrderId] = useState<bigint | null>(null);

  const cartTotal = cart.reduce((s, i) => s + i.quantity, 0);

  // Filter listings
  const displayListings: Listing[] = listings ?? [];
  const filtered = displayListings.filter((l) => {
    const matchCat =
      activeCategory === "all" ||
      (l.category as unknown as string) === activeCategory;
    const matchSearch =
      !search ||
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  function addToCart(listing: Listing) {
    setCart((prev) => {
      const existing = prev.find((i) => i.listing.id === listing.id);
      if (existing) {
        if (existing.quantity >= Number(listing.stock)) {
          toast.error("Maximum stock reached");
          return prev;
        }
        return prev.map((i) =>
          i.listing.id === listing.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { listing, quantity: 1 }];
    });
    toast.success(`${listing.title} added to cart!`, { duration: 2000 });
  }

  function updateQty(id: bigint, delta: number) {
    setCart((prev) =>
      prev
        .map((i) =>
          i.listing.id === id
            ? { ...i, quantity: Math.max(1, i.quantity + delta) }
            : i,
        )
        .filter((i) => i.quantity > 0),
    );
  }

  function removeFromCart(id: bigint) {
    setCart((prev) => prev.filter((i) => i.listing.id !== id));
  }

  async function handleDeleteListing(id: bigint) {
    try {
      await deleteListing.mutateAsync(id);
      toast.success("Listing deleted");
    } catch {
      toast.error("Failed to delete");
    }
  }

  async function handleUpdateOrderStatus(orderId: bigint, status: string) {
    try {
      await updateOrderStatus.mutateAsync({
        orderId,
        status: status as unknown as import("@/types/index").OrderStatus,
      });
      toast.success("Order status updated");
    } catch {
      toast.error("Failed to update status");
    }
  }

  const heroContent = (
    <div className="flex gap-3 flex-wrap">
      <div className="glass border border-[oklch(0.52_0.18_35/0.3)] rounded-xl p-4 min-w-[130px] text-center">
        <div className="text-2xl font-bold" style={{ color: TC_LIGHT }}>
          {displayListings.length || "10+"}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">Products</div>
      </div>
      <div className="glass border border-[oklch(0.52_0.18_35/0.3)] rounded-xl p-4 min-w-[130px] text-center">
        <div className="text-2xl font-bold" style={{ color: TC_LIGHT }}>
          {sellerStats
            ? `₹${(Number(sellerStats.totalRevenue) / 100).toLocaleString()}`
            : "100+"}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">Revenue</div>
      </div>
    </div>
  );

  return (
    <ModuleLayout
      title="Heritage Marketplace"
      subtitle="Buy and sell authentic handmade crafts, textiles, art, jewelry, instruments, and artisan products from verified artisans."
      icon={ShoppingBag}
      accent="terracotta"
      badge="Artisan Commerce"
      onNavigateHome={onNavigateHome}
      onNavigate={onNavigate}
      heroContent={heroContent}
    >
      {/* ── View Tabs + Cart ───────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-7 gap-4 flex-wrap">
        <div className="flex rounded-xl overflow-hidden border border-border/40 p-1 glass">
          {(["browse", "sell", "orders"] as const).map((v) => (
            <button
              key={v}
              type="button"
              data-ocid={`marketplace.${v}_tab`}
              onClick={() => {
                if ((v === "sell" || v === "orders") && !isAuthenticated) {
                  login();
                  return;
                }
                setView(v);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize flex items-center gap-1.5 ${
                view === v
                  ? "text-[oklch(0.97_0.005_240)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={view === v ? { background: TC } : {}}
            >
              {v === "browse" ? (
                <>
                  <Store className="w-3.5 h-3.5" /> Browse
                </>
              ) : v === "sell" ? (
                <>
                  <Tag className="w-3.5 h-3.5" /> Sell
                </>
              ) : (
                <>
                  <Package className="w-3.5 h-3.5" /> Orders
                </>
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          data-ocid="marketplace.cart_button"
          onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-2 px-4 py-2 glass rounded-xl border border-border/40 hover:border-[oklch(0.52_0.18_35/0.4)] transition-colors"
        >
          <ShoppingCart className="w-5 h-5" style={{ color: TC_LIGHT }} />
          <span className="text-sm font-medium text-foreground">Cart</span>
          {cartTotal > 0 && (
            <span
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-[oklch(0.97_0.005_240)]"
              style={{ background: TC }}
            >
              {cartTotal}
            </span>
          )}
        </button>
      </div>

      {/* ── Browse View ───────────────────────────────────────────── */}
      {view === "browse" && (
        <>
          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                data-ocid="marketplace.search_input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search crafts, textiles, art..."
                className="pl-9"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mb-6 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                data-ocid={`marketplace.filter.${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  activeCategory === cat.id
                    ? "text-[oklch(0.97_0.005_240)]"
                    : "glass border border-[oklch(0.52_0.18_35/0.3)] text-[oklch(0.60_0.10_35)] hover:bg-[oklch(0.52_0.18_35/0.08)]"
                }`}
                style={activeCategory === cat.id ? { background: TC } : {}}
              >
                {cat.id === "all"
                  ? "All"
                  : `${categoryEmojis[cat.id] ?? ""} ${cat.label}`}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div
              data-ocid="marketplace.loading_state"
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-64 rounded-2xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              data-ocid="marketplace.empty_state"
              className="flex flex-col items-center gap-4 py-20 text-center"
            >
              <PackageOpen className="w-14 h-14 text-muted-foreground opacity-30" />
              <div>
                <p className="text-foreground font-medium">No products found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try a different category or search term
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setActiveCategory("all");
                  setSearch("");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((listing, i) => (
                <ProductCard
                  key={String(listing.id)}
                  listing={listing}
                  index={i}
                  onAddToCart={addToCart}
                  isAuthenticated={isAuthenticated}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* ── Sell / Seller Dashboard ───────────────────────────────── */}
      {view === "sell" && (
        <div className="flex flex-col gap-6">
          {/* Stats */}
          {sellerStats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: PackageOpen,
                  label: "Listings",
                  value: String(sellerStats.totalListings),
                  color: TC_LIGHT,
                },
                {
                  icon: ShoppingBag,
                  label: "Orders",
                  value: String(sellerStats.totalOrders),
                  color: "oklch(0.65_0.15_200)",
                },
                {
                  icon: TrendingUp,
                  label: "Revenue",
                  value: `₹${(Number(sellerStats.totalRevenue) / 100).toLocaleString()}`,
                  color: "oklch(0.55_0.18_140)",
                },
                {
                  icon: Star,
                  label: "Rating",
                  value: `${(Number(sellerStats.rating) / 10).toFixed(1)} ★`,
                  color: "oklch(0.68_0.22_86)",
                },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  data-ocid={`marketplace.seller_stat.${i + 1}`}
                  className="glass border border-border/40 rounded-xl p-4 flex items-center gap-3"
                >
                  <stat.icon
                    className="w-8 h-8 opacity-70 flex-shrink-0"
                    style={{ color: stat.color }}
                  />
                  <div>
                    <div className="font-bold text-lg text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add listing section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">
                My Listings ({myListings?.length ?? 0})
              </h3>
              <Button
                size="sm"
                data-ocid="marketplace.add_listing_button"
                onClick={() => setAddFormOpen((v) => !v)}
                className="gap-1.5 border-0"
                style={{ background: TC, color: "oklch(0.97 0.005 240)" }}
              >
                <Plus className="w-4 h-4" />
                {addFormOpen ? "Close" : "Add Listing"}
              </Button>
            </div>

            <AnimatePresence>
              {addFormOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="glass border border-[oklch(0.52_0.18_35/0.3)] rounded-2xl p-5 mb-5">
                    <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                      <Store className="w-4 h-4" style={{ color: TC_LIGHT }} />
                      New Listing
                    </h4>
                    <AddListingForm onClose={() => setAddFormOpen(false)} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Listings table */}
            {(myListings?.length ?? 0) === 0 ? (
              <div
                data-ocid="marketplace.my_listings_empty_state"
                className="glass border border-[oklch(0.52_0.18_35/0.2)] rounded-2xl p-10 text-center"
              >
                <Package
                  className="w-12 h-12 mx-auto mb-3 opacity-30"
                  style={{ color: TC_LIGHT }}
                />
                <p className="text-muted-foreground text-sm mb-3">
                  No listings yet. Start selling your authentic crafts!
                </p>
                <Button
                  data-ocid="marketplace.create_first_listing_button"
                  size="sm"
                  onClick={() => setAddFormOpen(true)}
                  className="gap-2 border-0"
                  style={{ background: TC, color: "oklch(0.97 0.005 240)" }}
                >
                  <Plus className="w-4 h-4" /> Create First Listing
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {myListings?.map((listing, i) => (
                  <div
                    key={String(listing.id)}
                    data-ocid={`marketplace.my_listing.${i + 1}`}
                  >
                    {editingId === listing.id ? (
                      <EditListingRow
                        listing={listing}
                        onDone={() => setEditingId(null)}
                      />
                    ) : (
                      <div className="glass border border-border/40 rounded-xl p-4 flex items-center gap-4">
                        <span className="text-2xl flex-shrink-0">
                          {categoryEmojis[
                            listing.category as unknown as string
                          ] ?? "🛍️"}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">
                            {listing.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-muted-foreground">
                              {formatPrice(listing.price)}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              •
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {Number(listing.stock)} stock
                            </span>
                            <Badge
                              className={`text-[10px] border-0 h-4 ${listing.isActive ? "bg-[oklch(0.55_0.18_140/0.15)] text-[oklch(0.55_0.18_140)]" : "bg-muted text-muted-foreground"}`}
                            >
                              {listing.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            type="button"
                            data-ocid={`marketplace.edit_listing_button.${i + 1}`}
                            onClick={() => setEditingId(listing.id)}
                            className="p-2 rounded-lg hover:bg-muted transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button
                            type="button"
                            data-ocid={`marketplace.delete_listing_button.${i + 1}`}
                            onClick={() => handleDeleteListing(listing.id)}
                            className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-destructive/70" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Seller orders */}
          {(sellerOrders?.length ?? 0) > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" style={{ color: TC_LIGHT }} />
                Incoming Orders ({sellerOrders?.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-3 text-xs text-muted-foreground font-medium">
                        Order
                      </th>
                      <th className="pb-3 text-xs text-muted-foreground font-medium">
                        Qty
                      </th>
                      <th className="pb-3 text-xs text-muted-foreground font-medium">
                        Total
                      </th>
                      <th className="pb-3 text-xs text-muted-foreground font-medium">
                        Date
                      </th>
                      <th className="pb-3 text-xs text-muted-foreground font-medium">
                        Status
                      </th>
                      <th className="pb-3 text-xs text-muted-foreground font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerOrders?.map((order, i) => {
                      const st =
                        ORDER_STATUSES[order.status as unknown as string] ??
                        ORDER_STATUSES.pending;
                      return (
                        <tr
                          key={String(order.id)}
                          data-ocid={`marketplace.seller_order.${i + 1}`}
                          className="border-b border-border/40"
                        >
                          <td className="py-3 text-xs font-mono text-muted-foreground">
                            #{String(order.id).slice(-6).padStart(6, "0")}
                          </td>
                          <td className="py-3 text-xs">
                            {String(order.quantity)}
                          </td>
                          <td className="py-3 text-xs font-medium">
                            {formatPrice(order.totalPrice)}
                          </td>
                          <td className="py-3 text-xs text-muted-foreground">
                            {formatDate(order.createdAt)}
                          </td>
                          <td className="py-3">
                            <span
                              className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${st.color}`}
                            >
                              {st.label}
                            </span>
                          </td>
                          <td className="py-3">
                            {(order.status as unknown as string) === "paid" && (
                              <button
                                type="button"
                                data-ocid={`marketplace.mark_shipped_button.${i + 1}`}
                                onClick={() =>
                                  handleUpdateOrderStatus(order.id, "shipped")
                                }
                                className="text-[10px] font-medium text-[oklch(0.45_0.25_295)] hover:underline"
                              >
                                Mark Shipped
                              </button>
                            )}
                            {(order.status as unknown as string) ===
                              "shipped" && (
                              <button
                                type="button"
                                data-ocid={`marketplace.mark_delivered_button.${i + 1}`}
                                onClick={() =>
                                  handleUpdateOrderStatus(order.id, "delivered")
                                }
                                className="text-[10px] font-medium text-[oklch(0.55_0.18_140)] hover:underline"
                              >
                                Mark Delivered
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Orders View (Buyer) ───────────────────────────────────── */}
      {view === "orders" && (
        <div>
          <h3 className="font-semibold text-foreground mb-5 flex items-center gap-2">
            <Package className="w-5 h-5" style={{ color: TC_LIGHT }} />
            My Orders ({buyerOrders?.length ?? 0})
          </h3>

          {(buyerOrders?.length ?? 0) === 0 ? (
            <div
              data-ocid="marketplace.orders_empty_state"
              className="flex flex-col items-center gap-4 py-20 text-center"
            >
              <ShoppingBag className="w-14 h-14 text-muted-foreground opacity-30" />
              <div>
                <p className="text-foreground font-medium">No orders yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Browse our marketplace and place your first order
                </p>
              </div>
              <Button
                onClick={() => setView("browse")}
                className="border-0"
                style={{ background: TC, color: "oklch(0.97 0.005 240)" }}
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {buyerOrders?.map((order, i) => {
                const st =
                  ORDER_STATUSES[order.status as unknown as string] ??
                  ORDER_STATUSES.pending;
                return (
                  <div
                    key={String(order.id)}
                    data-ocid={`marketplace.order.${i + 1}`}
                    className="glass border border-border/40 rounded-2xl p-5"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-muted-foreground">
                            Order #{String(order.id).slice(-8).padStart(8, "0")}
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${st.color}`}
                          >
                            {st.label}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          Qty: {String(order.quantity)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">
                          {formatPrice(order.totalPrice)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 max-w-[180px] text-right truncate">
                          {order.shippingAddress
                            .split(",")
                            .slice(0, 2)
                            .join(",")}
                        </p>
                      </div>
                    </div>

                    {/* Status timeline */}
                    <div className="mt-4 flex items-center gap-1">
                      {["pending", "paid", "shipped", "delivered"].map(
                        (s, idx) => {
                          const currentIdx = [
                            "pending",
                            "paid",
                            "shipped",
                            "delivered",
                          ].indexOf(order.status as unknown as string);
                          const done = idx <= currentIdx;
                          return (
                            <div
                              key={s}
                              className="flex items-center gap-1 flex-1"
                            >
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${done ? "bg-[oklch(0.55_0.18_140)]" : "bg-border"}`}
                              >
                                {done && (
                                  <Check className="w-2.5 h-2.5 text-[oklch(0.97_0.005_240)]" />
                                )}
                              </div>
                              <div className="text-[9px] text-muted-foreground capitalize hidden sm:block">
                                {s}
                              </div>
                              {idx < 3 && (
                                <div
                                  className={`flex-1 h-0.5 ${done && idx < currentIdx ? "bg-[oklch(0.55_0.18_140)]" : "bg-border"}`}
                                />
                              )}
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Overlays ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              key="cart-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[oklch(0.05_0.05_260/0.4)] z-40"
              onClick={() => setCartOpen(false)}
            />
            <CartPanel
              cart={cart}
              onClose={() => setCartOpen(false)}
              onUpdateQty={updateQty}
              onRemove={removeFromCart}
              onCheckout={() => {
                setCartOpen(false);
                setCheckoutOpen(true);
              }}
            />
          </>
        )}

        {checkoutOpen && (
          <CheckoutModal
            key="checkout"
            cart={cart}
            onClose={() => {
              setCheckoutOpen(false);
              setCart([]);
            }}
            onOrderPlaced={(id) => {
              setLastOrderId(id);
              setCart([]);
            }}
          />
        )}
      </AnimatePresence>
    </ModuleLayout>
  );
}
