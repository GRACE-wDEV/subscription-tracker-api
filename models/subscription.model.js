import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema({
  name:{
    type: String,
    required: [true, `Subscription name is required`],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  price:{
    type: Number,
    required: [true, `Subscription price is required`],
    min: [0, `Price must be greater than 0`],
  },
  currency:{
    type: String,
    enum: ['USD', 'EUR', 'GBP'],
    default: 'USD'
  },
  frequency:{
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
  },
  category:{
    type: String,
    enum: ['Sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
    required: true,
  },
  paymentMethod:{
    type: String,
    trim: true,
    required: true,
  },
  status:{
    type: String,
    enum: ['active', 'cancelled', 'expired'],
    default: 'active'
  },
  startDate:{
    type: Date,
    required: true,
    validate:{
      validator: (val)=>{val<=new Date()},
      message:`Start date must be in the past`,
    }
  },
  renewalDate:{
    type: Date,
    validate:{
      validator: function (val){
        return val > this.startDate;
      },
      message:`Renewal date must be after the start date`,
    }
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index:true,
  }
}, {timestamps:true});

subscriptionSchema.pre('save', function(next){
  //auto-calculate renewal date if missing
  if(!this.renewalDate)
  {
    const renewalPeriods={
      daily:1,
      weekly:7,
      monthly:30,
      yearly:365,
    }
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate()+renewalPeriods[this.frequency])
  }
  if(this.renewalDate < new Date())
    this.status='expired';
  next();
})

const Subcription = mongoose.model('Subscription', subscriptionSchema);
export default Subcription;